import DeleteArticleImage from '#actions/articles/delete_article_image'
import type User from '#models/user'

type Params = {
  user: User
  id: string
}

export default class DeleteRestaurant {
  static async handle({ user, id }: Params) {
    const restaurant = await user
      .related('restaurants')
      .query()
      .where('restaurants.id', id)
      .firstOrFail()

    const articles = await restaurant.related('articles').query()
    await restaurant.delete()
    await DeleteArticleImage.handleArray(articles)

    return restaurant
  }
}
