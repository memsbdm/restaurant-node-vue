import CancelRestaurantInvite from '#actions/restaurants/cancel_restaurant_invite'
import type { HttpContext } from '@adonisjs/core/http'

export default class CancelRestaurantInviteController {
  async handle({ params, response, auth, session, restaurant }: HttpContext) {
    await CancelRestaurantInvite.handle({
      restaurant,
      canceledByUserId: auth.use('web').user!.id,
      inviteId: params.id,
    })

    session.flash('success', 'Invitation canceled successfully')

    return response.redirect().back()
  }
}
