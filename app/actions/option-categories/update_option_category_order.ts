import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  articleId: number
  ids: string[]
}

export default class UpdateOptionCategoryOrder {
  static async handle({ restaurant, articleId, ids }: Params) {
    const article = await restaurant
      .related('articles')
      .query()
      .where('id', articleId)
      .firstOrFail()

    let optionCategories = await article.related('optionCategories').query()

    await db.transaction(async (trx) => {
      for (const optionCategory of optionCategories) {
        const order = ids.indexOf(optionCategory.id) + 1
        optionCategory.useTransaction(trx)
        await optionCategory.merge({ order }).save()
      }
    })

    optionCategories = optionCategories.sort((a, b) => a.order - b.order)

    return optionCategories
  }
}
