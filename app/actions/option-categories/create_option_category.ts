import { Infer } from '@vinejs/vine/types'
import { optionCategoryValidator } from '#validators/option_category'
import Article from '#models/article'
import OptionCategoryType from '#models/option_category_type'
import Restaurant from '#models/restaurant'

type Params = {
  articleId: number
  data: Infer<typeof optionCategoryValidator>
  restaurant: Restaurant
}

export default class CreateOptionCategory {
  static async handle({ articleId, data, restaurant }: Params) {
    const articlePromise = await restaurant
      .related('articles')
      .query()
      .where('id', articleId)
      .firstOrFail()
    const typePromise = OptionCategoryType.query().where('id', data.typeId).firstOrFail()

    const [article, type] = await Promise.all([articlePromise, typePromise])

    return article.related('optionCategories').create({
      name: data.name,
      typeId: type.id,
      articleId: article.id,
      maxSelectionCount: data.maxSelectionCount,
      order: await this.#findNextOrder(article),
    })
  }

  static async #findNextOrder(article: Article) {
    const lastOptionCategory = await article
      .related('optionCategories')
      .query()
      .select('order')
      .orderBy('order', 'desc')
      .first()
    return lastOptionCategory ? lastOptionCategory.order + 1 : 1
  }
}
