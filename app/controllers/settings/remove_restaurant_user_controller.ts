import RemoveRestaurantUser from '#actions/restaurants/remove_restaurant_user'
import ForbiddenException from '#exceptions/forbidden_exception'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RemoveRestaurantUserController {
  async handle({ auth, can, response, restaurant, session, params }: HttpContext) {
    const user = auth.use('web').user!

    if (!can.restaurant.canManageUsers && params.id !== user.id) {
      throw new ForbiddenException('You are not allowed to remove users')
    }

    await RemoveRestaurantUser.handle({
      restaurant,
      removeUserId: params.id,
    })

    session.flash('success', 'Member has been successfully removed')

    return response.redirect().back()
  }
}
