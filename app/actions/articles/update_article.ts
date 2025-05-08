import Restaurant from '#models/restaurant'
import { articleValidator } from '#validators/article'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  id: number
  data: Infer<typeof articleValidator>
}

export default class UpdateArticle {
  static async handle({ restaurant, id, data }: Params) {
    const article = await restaurant.related('articles').query().where({ id }).firstOrFail()

    article.merge({
      name: data.name,
      description: data.description,
      priceInCents: data.price * 100,
      categoryId: data.categoryId,
    })

    return article.save()
  }
}
