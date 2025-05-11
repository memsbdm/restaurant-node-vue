import DeleteImage from '#actions/mailer/delete_image'
import Restaurant from '#models/restaurant'
import db from '@adonisjs/lucid/services/db'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class DeleteArticle {
  static async handle({ restaurant, id }: Params) {
    const article = await restaurant.related('articles').query().where({ id }).firstOrFail()
    await db.transaction(async (trx) => {
      article.useTransaction(trx)
      restaurant.useTransaction(trx)

      await article.delete()
      await restaurant
        .related('articles')
        .query()
        .where('categoryId', article.categoryId)
        .where('order', '>', article.order)
        .decrement('order')
    })

    if (article.imageUrl) {
      await DeleteImage.handle({ fileUrl: article.imageUrl })
    }

    return article
  }
}
