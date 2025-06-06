import AcceptRestaurantInvite from '#actions/restaurants/accept_restaurant_invite'
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'
import limiter from '@adonisjs/limiter/services/main'

type Params = {
  data: Infer<typeof loginValidator>
}

@inject()
export default class Login {
  constructor(protected ctx: HttpContext) {}

  get limit() {
    return limiter.use({
      requests: 3,
      duration: '3 hours',
      blockDuration: '24 hours',
    })
  }

  async handle({ data }: Params) {
    const key = this.#getRateKey(data.email)

    const [error, user] = await this.limit.penalize(key, async () => {
      return User.verifyCredentials(data.email, data.password)
    })

    if (error) {
      this.ctx.session.flashAll()
      this.ctx.session.flashErrors({
        E_TOO_MANY_REQUESTS: 'Too many login attempts. Please try again later.',
      })
      return null
    }

    await this.ctx.auth.use('web').login(user, data.remember)
    await this.#checkForRestaurantInvite(user)

    this.ctx.session.flash('success', 'Successfully logged in')

    return { user }
  }

  async clearRateLimits(email: string) {
    await this.limit.delete(this.#getRateKey(email))
  }

  async #checkForRestaurantInvite(user: User) {
    const inviteId = this.ctx.session.get('invite_id')

    if (!inviteId) return

    const result = await AcceptRestaurantInvite.handle({
      inviteId,
      user,
    })

    this.ctx.session.forget('invite_id')
    this.ctx.session.flash(result.state, result.message)
  }

  #getRateKey(email: string) {
    return `login_${this.ctx.request.ip()}_${email}`
  }
}
