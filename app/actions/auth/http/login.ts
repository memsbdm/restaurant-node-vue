import AcceptRestaurantInvite from '#actions/restaurants/accept_restaurant_invite'
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof loginValidator>
}

@inject()
export default class Login {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.verifyCredentials(data.email, data.password)
    await this.ctx.auth.use('web').login(user, data.remember)
    await this.#checkForRestaurantInvite(user)

    this.ctx.session.flash('success', 'Successfully logged in')

    return { user }
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
}
