import { Infer } from '@vinejs/vine/types'
import { optionValidator } from '#validators/option'
import Restaurant from '#models/restaurant'
import OptionCategory from '#models/option_category'

type Params = {
  data: Infer<typeof optionValidator>
  restaurant: Restaurant
  optionCategoryId: number
}

export default class CreateOption {
  static async handle({ data, restaurant, optionCategoryId }: Params) {
    const optionCategory = await restaurant
      .related('optionCategories')
      .query()
      .where('id', optionCategoryId)
      .firstOrFail()

    return optionCategory.related('options').create({
      name: data.name,
      priceInCents: data.priceInCents,
      order: await this.#findNextOrder(optionCategory),
      restaurantId: restaurant.id,
    })
  }

  static async #findNextOrder(optionCategory: OptionCategory) {
    const lastOption = await optionCategory
      .related('options')
      .query()
      .select('order')
      .orderBy('order', 'desc')
      .first()
    return lastOption ? lastOption.order + 1 : 1
  }
}
