import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  articleId: number
  optionCategoryId: number
}

export default class DeleteOptionCategory {
  static async handle({ restaurant, articleId, optionCategoryId }: Params) {
    const article = await restaurant
      .related('articles')
      .query()
      .where('id', articleId)
      .firstOrFail()

    const optionCategory = await article
      .related('optionCategories')
      .query()
      .where('id', optionCategoryId)
      .firstOrFail()

    await optionCategory.delete()
  }
}
