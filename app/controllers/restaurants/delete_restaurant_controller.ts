import GetRestaurantAbilities from '#actions/abilities/get_restaurant_abilities'
import DeleteRestaurant from '#actions/restaurants/delete_restaurant'
import GetRestaurantUserRoleId from '#actions/restaurants/get_restaurant_user_role_id'
import ForbiddenException from '#exceptions/forbidden_exception'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteRestaurantController {
  async handle({ params, response, auth, session }: HttpContext) {
    const roleId = await GetRestaurantUserRoleId.handle({
      restaurantId: params.id!,
      userId: auth.use('web').user!.id,
    })

    if (!GetRestaurantAbilities.canDestroy(roleId)) {
      throw new ForbiddenException('You are not allowed to delete this restaurant')
    }

    await DeleteRestaurant.handle({
      user: auth.user!,
      id: params.id,
    })

    session.flash('success', 'Your restaurant has been deleted')

    return response.redirect().toPath('/')
  }
}
