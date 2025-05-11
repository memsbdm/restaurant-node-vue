import AcceptRestaurantInvite from '#actions/restaurants/accept_restaurant_invite'
import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof registerValidator>
}

@inject()
export default class Register {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.create(data)
    await this.ctx.auth.use('web').login(user)
    const invite = await this.#checkForRestaurantInvite(user)
    return { user, invite }
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

    return result.invite
  }
}
