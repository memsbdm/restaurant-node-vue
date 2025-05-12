import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurantId: string
  userId: string
}

export default class GetRestaurantUserRoleId {
  static async handle({ restaurantId, userId }: Params) {
    const { roleId } = await db
      .from('restaurant_users')
      .where('restaurant_id', restaurantId)
      .where('user_id', userId)
      .select('role_id as roleId')
      .firstOrFail()

    return roleId
  }
}
