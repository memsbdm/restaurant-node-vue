import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class GetArticle {
  static async handle({ restaurant, id }: Params) {
    const article = await restaurant
      .related('articles')
      .query()
      .where({ id })
      .preload('optionCategories', (query) => {
        query.preload('options', (optionsQuery) => {
          optionsQuery.orderBy('order', 'asc')
        })
        query.orderBy('order', 'asc')
      })
      .firstOrFail()

    return article
  }
}
