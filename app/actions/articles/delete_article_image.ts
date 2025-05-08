import DeleteImage from '#actions/mailer/delete_image'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class DeleteArticleImage {
  static async handle({ restaurant, id }: Params) {
    const article = await restaurant.related('articles').query().where({ id }).firstOrFail()
    if (article.imageUrl) {
      await DeleteImage.handle({ fileUrl: article.imageUrl })
      await article.merge({ imageUrl: null }).save()
    }

    return article
  }
}
