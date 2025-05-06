import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class DeleteMenu {
  static async handle({ restaurant, id }: Params) {
    const menu = await restaurant.related('menus').query().where({ id }).firstOrFail()
    return await menu.delete()
  }
}
