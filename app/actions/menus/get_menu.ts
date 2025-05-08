import Menu from '#models/menu'
import Restaurant from '#models/restaurant'

type Params = {
  id: number
  restaurant: Restaurant
}

export default class GetMenu {
  static async handle({ id, restaurant }: Params) {
    const menu = await restaurant
      .related('menus')
      .query()
      .withCount('articles')
      .where({ id })
      .firstOrFail()
    const categories = await this.#getCategories(menu)
    return { menu, categories }
  }

  static async #getCategories(menu: Menu) {
    return menu
      .related('categories')
      .query()
      .preload('articles', (query) => {
        query.orderBy('order')
      })
      .orderBy('order')
  }
}
