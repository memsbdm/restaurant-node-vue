import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import Register from '#actions/auth/http/register'
import { inject } from '@adonisjs/core'
import RestaurantInvite from '#models/restaurant_invite'
import RestaurantInviteDto from '#dtos/restaurant_invite'

export default class RegisterController {
  async render({ inertia, session }: HttpContext) {
    const inviteId = session.get('invite_id')

    if (inviteId) {
      const invite = await RestaurantInvite.find(inviteId)
      if (!invite) {
        session.forget('invite_id')
      } else {
        inertia.share({ invite: new RestaurantInviteDto(invite) })
      }
    }

    return inertia.render('auth/register')
  }

  @inject()
  async handle({ request, response }: HttpContext, register: Register) {
    const data = await request.validateUsing(registerValidator)
    const { invite } = await register.handle({ data })

    if (invite) {
      return response.redirect().toRoute('menus.create.render')
    }

    return response.redirect().toRoute('restaurants.create.render')
  }
}
