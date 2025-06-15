import OptionCategoryType from '#models/option_category_type'
import Restaurant from '#models/restaurant'
import { optionCategoryValidator } from '#validators/option_category'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  optionCategoryId: number
  articleId: number
  data: Infer<typeof optionCategoryValidator>
}

export default class UpdateOptionCategory {
  static async handle({ restaurant, optionCategoryId, articleId, data }: Params) {
    const articlePromise = restaurant
      .related('articles')
      .query()
      .where('id', articleId)
      .whereHas('optionCategories', (query) => query.where('id', optionCategoryId))
      .firstOrFail()

    const typePromise = OptionCategoryType.query().where('id', data.typeId).firstOrFail()

    const [article, type] = await Promise.all([articlePromise, typePromise])

    const optionCategory = await article
      .related('optionCategories')
      .query()
      .where('id', optionCategoryId)
      .firstOrFail()

    return optionCategory
      .merge({
        name: data.name,
        typeId: type.id,
        maxSelectionCount: data.maxSelectionCount ?? null,
        restaurantId: restaurant.id,
      })
      .save()
  }
}
