import Restaurant from '#models/restaurant'
import { articleOrderValidator } from '#validators/article'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  menuId: number
  data: SortData
}

type SortData = Infer<typeof articleOrderValidator>

type ArticleFlatData = {
  id: string
  categoryId: string
  order: number
}

export default class UpdateArticleOrder {
  static async handle({ restaurant, menuId, data }: Params) {
    const menu = await restaurant.related('menus').query().where('id', menuId).firstOrFail()
    const articles = await menu.related('articles').query().select('id', 'categoryId', 'order')
    const articlesData = this.#flattenData(data)

    return db.transaction(async (trx) => {
      const promises = articlesData.map(({ id, categoryId, order }) => {
        const article = articles.find((item) => item.id === id)
        const isSame = article?.order === order && article.categoryId === categoryId

        if (!article || isSame) {
          return
        }

        article.useTransaction(trx)

        return article.merge({ categoryId, order }).save()
      })
      return Promise.all(promises)
    })
  }

  static #flattenData(data: SortData) {
    return data.categories.reduce<ArticleFlatData[]>((articles, category) => {
      const categoryArticles = category.articles.map((id, index) => ({
        id,
        categoryId: category.id,
        order: index,
      }))

      return [...articles, ...categoryArticles]
    }, [])
  }
}
