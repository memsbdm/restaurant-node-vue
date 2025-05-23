import Restaurant from '#models/restaurant'
import { menuValidator } from '#validators/menu'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof menuValidator>
}

export default class CreateMenu {
  static async handle({ restaurant, data }: Params) {
    return restaurant.related('menus').create({
      ...data,
    })
  }
}
