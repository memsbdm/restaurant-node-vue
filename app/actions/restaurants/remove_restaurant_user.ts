import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'
import GetRestaurantUserRoleId from './get_restaurant_user_role_id.js'
import ForbiddenException from '#exceptions/forbidden_exception'
import { Role } from '#enums/role'

type Params = {
  restaurant: Restaurant
  removeUserId: string
}

export default class RemoveRestaurantUser {
  static async handle({ restaurant, removeUserId }: Params) {
    const deletedUserRoleId = await GetRestaurantUserRoleId.handle({
      restaurantId: restaurant.id,
      userId: removeUserId,
    })

    if (deletedUserRoleId === Role.Admin) {
      throw new ForbiddenException(
        'You cannot remove the owner of the restaurant. If you are the owner, please delete the restaurant.'
      )
    }

    const otherUserCount = await restaurant
      .related('users')
      .query()
      .whereNot('users.id', removeUserId)
      .count('users.id')
      .firstOrFail()

    await db.transaction(async (trx) => {
      restaurant.useTransaction(trx)

      await restaurant.related('users').detach([removeUserId])

      if (otherUserCount.$extras.count === '0') {
        await restaurant.delete()
      }
    })
  }
}
