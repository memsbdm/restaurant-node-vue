import StoreImage from '#actions/mailer/store_image'
import Article from '#models/article'
import Restaurant from '#models/restaurant'
import { articleValidator } from '#validators/article'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof articleValidator>
}

export default class CreateArticle {
  static async handle({ restaurant, data }: Params) {
    return restaurant.related('articles').create({
      name: data.name,
      description: data.description,
      priceInCents: data.price * 100,
      categoryId: data.categoryId,
      order: await this.#findNextOrder(data.categoryId),
      imageUrl: data.image
        ? await StoreImage.handle({ image: data.image, path: 'articles' })
        : null,
    })
  }

  static async #findNextOrder(categoryId: string) {
    const lastCategoryArticle = await Article.query()
      .where({ categoryId })
      .select('order')
      .orderBy('order', 'desc')
      .first()

    return lastCategoryArticle ? lastCategoryArticle.order + 1 : 0
  }
}
