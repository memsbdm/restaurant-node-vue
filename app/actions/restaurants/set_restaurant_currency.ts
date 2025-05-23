import Restaurant from '#models/restaurant'
import { currencyValidator } from '#validators/currency'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof currencyValidator>
}

export default class SetRestaurantCurrency {
  static async handle({ restaurant, data }: Params) {
    await restaurant.merge({ currencyId: data.currencyId }).save()
  }
}
