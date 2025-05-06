import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  menuId: number
}

export default class ActiveMenu {
  static async handle({ restaurant, menuId }: Params) {
    return db.transaction(async (trx) => {
      restaurant.useTransaction(trx)

      const menu = await restaurant.related('menus').query().where({ id: menuId }).firstOrFail()
      if (menu.isActive) {
        return await menu.merge({ isActive: false }).save()
      }
      const menus = await restaurant.getMenus()
      await Promise.all(
        menus.map((m) => {
          return m.merge({ isActive: false }).save()
        })
      )
      await menu.merge({ isActive: true }).save()
    })
  }
}
