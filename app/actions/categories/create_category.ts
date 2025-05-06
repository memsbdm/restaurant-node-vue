import { Infer } from '@vinejs/vine/types'
import { categoryValidator } from '#validators/category'
import Menu from '#models/menu'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  menuId: number
  data: Infer<typeof categoryValidator>
}

export default class CreateCategory {
  static async handle({ restaurant, menuId, data }: Params) {
    const menu = await restaurant.related('menus').query().where('id', menuId).firstOrFail()

    return menu.related('categories').create({
      ...data,
      restaurantId: restaurant.id,
      menuId: menu.id,
      order: await this.#findNextOrder(menu),
    })
  }

  static async #findNextOrder(menu: Menu) {
    const lastCategory = await menu
      .related('categories')
      .query()
      .select('order')
      .orderBy('order', 'desc')
      .first()
    return lastCategory ? lastCategory.order + 1 : 1
  }
}
