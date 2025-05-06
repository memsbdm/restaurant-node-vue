import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  menuId: number
  ids: string[]
}

export default class UpdateCategoryOrder {
  static async handle({ restaurant, menuId, ids }: Params) {
    const menu = await restaurant.related('menus').query().where('id', menuId).firstOrFail()
    let categories = await menu.related('categories').query()

    await db.transaction(async (trx) => {
      for (const category of categories) {
        const order = ids.indexOf(category.id) + 1
        category.useTransaction(trx)
        await category.merge({ order }).save()
      }
    })

    categories = categories.sort((a, b) => a.order - b.order)

    return categories
  }
}
