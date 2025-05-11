import RemoveRestaurantUser from '#actions/restaurants/remove_restaurant_user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RemoveRestaurantUserController {
  async handle({ response, restaurant, session, params }: HttpContext) {
    await RemoveRestaurantUser.handle({
      restaurant,
      removeUserId: params.id,
    })

    session.flash('success', 'Member has been successfully removed')

    return response.redirect().back()
  }
}
