import Restaurant from '#models/restaurant'
import { menuValidator } from '#validators/menu'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  id: number
  data: Infer<typeof menuValidator>
}

export default class UpdateMenu {
  static async handle({ restaurant, id, data }: Params) {
    const menu = await restaurant.related('menus').query().where({ id }).firstOrFail()
    await menu.merge(data).save()

    return menu
  }
}
