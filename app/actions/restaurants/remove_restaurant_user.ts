import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  removeUserId: string
}

export default class RemoveRestaurantUser {
  static async handle({ restaurant, removeUserId }: Params) {
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
