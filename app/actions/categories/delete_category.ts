import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  menuId: number
  categoryId: number
}

export default class DeleteCategory {
  static async handle({ restaurant, menuId, categoryId }: Params) {
    const menu = await restaurant.related('menus').query().where('id', menuId).firstOrFail()
    const category = await menu.related('categories').query().where('id', categoryId).firstOrFail()
    await db.transaction(async (trx) => {
      menu.useTransaction(trx)
      category.useTransaction(trx)

      await category.delete()
      await menu
        .related('categories')
        .query()
        .where('order', '>', category.order)
        .decrement('order')
    })

    return category
  }
}
