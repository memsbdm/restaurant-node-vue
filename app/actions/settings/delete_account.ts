import Restaurant from '#models/restaurant'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { Role } from '#enums/role'
import ForbiddenException from '#exceptions/forbidden_exception'

type Params = {
  user: User
}

export default class DeleteAccount {
  static async handle({ user }: Params) {
    await db.transaction(async (trx) => {
      user.useTransaction(trx)

      const isAdminInRestaurant = await Restaurant.query({ client: trx })
        .whereHas('users', (query) => {
          query.where('users.id', user.id)
          query.where('restaurant_users.role_id', Role.Admin)
        })
        .first()

      if (isAdminInRestaurant) {
        throw new ForbiddenException()
      }

      await user.delete()
    })
  }
}
