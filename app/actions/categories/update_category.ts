import Restaurant from '#models/restaurant'
import { categoryValidator } from '#validators/category'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  categoryId: number
  data: Infer<typeof categoryValidator>
}

export default class UpdateCategory {
  static async handle({ restaurant, categoryId, data }: Params) {
    const category = await restaurant
      .related('categories')
      .query()
      .where('id', categoryId)
      .firstOrFail()
    return category.merge(data).save()
  }
}
