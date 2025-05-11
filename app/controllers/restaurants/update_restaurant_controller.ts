import GetRestaurantPendingInvites from '#actions/restaurants/get_restaurant_pending_invites'
import GetRestaurantUsers from '#actions/restaurants/get_restaurant_users'
import UpdateRestaurant from '#actions/restaurants/update_restaurant'
import RestaurantInviteDto from '#dtos/restaurant_invite'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
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

  async handle({ params, request, response, auth, session }: HttpContext) {
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
