import GetRestaurantAbilities from '#actions/abilities/get_restaurant_abilities'
import GetRestaurantPendingInvites from '#actions/restaurants/get_restaurant_pending_invites'
import GetRestaurantUserRoleId from '#actions/restaurants/get_restaurant_user_role_id'
import GetRestaurantUsers from '#actions/restaurants/get_restaurant_users'
import UpdateRestaurant from '#actions/restaurants/update_restaurant'
import RestaurantInviteDto from '#dtos/restaurant_invite'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
import ForbiddenException from '#exceptions/forbidden_exception'
import Role from '#models/role'
import { updateRestaurantValidator } from '#validators/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateRestaurantController {
  render({ inertia, restaurant }: HttpContext) {
    return inertia.render('settings/restaurant', {
      users: async () => {
        const users = await GetRestaurantUsers.handle({ restaurant })
        return UserDto.fromArray(users)
      },
      roles: async () => {
        const roles = await Role.query().orderBy('name')
        return RoleDto.fromArray(roles)
      },
      invites: async () => {
        const pendingInvites = await GetRestaurantPendingInvites.handle({ restaurant })
        return RestaurantInviteDto.fromArray(pendingInvites)
      },
    })
  }

  async handle({ params, request, response, auth, restaurantId, session }: HttpContext) {
    const roleId = await GetRestaurantUserRoleId.handle({
      restaurantId: restaurantId!,
      userId: auth.use('web').user!.id,
    })

    if (!GetRestaurantAbilities.canEdit(roleId)) {
      throw new ForbiddenException('You are not allowed to update this restaurant')
    }

    const data = await request.validateUsing(updateRestaurantValidator)

    await UpdateRestaurant.handle({
      user: auth.user!,
      id: params.id,
      data,
    })

    session.flash('success', 'Your restaurant has been updated')

    return response.redirect().back()
  }
}
