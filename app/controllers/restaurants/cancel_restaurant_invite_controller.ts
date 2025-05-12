import CancelRestaurantInvite from '#actions/restaurants/cancel_restaurant_invite'
import ForbiddenException from '#exceptions/forbidden_exception'
import type { HttpContext } from '@adonisjs/core/http'

export default class CancelRestaurantInviteController {
  async handle({ can, params, response, auth, session, restaurant }: HttpContext) {
    if (!can.restaurant.manageUsers) {
      throw new ForbiddenException('You are not allowed to cancel invitations')
    }

    await CancelRestaurantInvite.handle({
      restaurant,
      canceledByUserId: auth.use('web').user!.id,
      inviteId: params.id,
    })

    session.flash('success', 'Invitation canceled successfully')

    return response.redirect().back()
  }
}
