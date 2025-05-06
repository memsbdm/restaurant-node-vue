import Restaurant from '#models/restaurant'

type Params = {
  id: number
  restaurant: Restaurant
}

export default class GetMenu {
  static async handle({ id, restaurant }: Params) {
    const menu = await restaurant.related('menus').query().where({ id }).firstOrFail()

    return { menu }
  }
}
