import AcceptRestaurantInvite from '#actions/restaurants/accept_restaurant_invite'
import RestaurantInvite from '#models/restaurant_invite'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AcceptInvitationController {
  async handle({ auth, request, response, params, session }: HttpContext) {
    await auth.use('web').check()

    const user = auth.use('web').user

    if (!request.hasValidSignature()) {
      session.flash('errorsBag', 'An invalid invitation URL was provided')
      return user
        ? response.redirect().toRoute('menus.create.render')
        : response.redirect().toRoute('auth.login.render')
    }

    if (!user) {
      const invite = await RestaurantInvite.findOrFail(params.id)
      const isUser = await User.findBy('email', invite.email)

      session.put('invite_id', invite.id)

      return isUser
        ? response.redirect().toRoute('auth.login.render')
        : response.redirect().toRoute('auth.register.render')
    }

    const result = await AcceptRestaurantInvite.handle({
      inviteId: params.id,
      user,
    })

    session.forget('invite_id')
    session.flash(result.state, result.message)

    return response.redirect().toRoute('menus.create.render')
  }
}
