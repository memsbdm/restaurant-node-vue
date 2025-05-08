import DeleteImage from '#actions/mailer/delete_image'
import StoreImage from '#actions/mailer/store_image'
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

    let imageUrl: string | null = null
    if (data.image) {
      imageUrl = await StoreImage.handle({ image: data.image, path: 'articles' })
      if (article.imageUrl) {
        await DeleteImage.handle({ fileUrl: article.imageUrl })
      }
    }

    article.merge({
      name: data.name,
      description: data.description,
      priceInCents: data.price * 100,
      categoryId: data.categoryId,
    })

    if (imageUrl) {
      article.merge({ imageUrl })
    }

    return article.save()
  }
}
