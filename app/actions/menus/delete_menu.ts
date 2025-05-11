import DeleteArticleImage from '#actions/articles/delete_article_image'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: string
}

export default class DeleteMenu {
  static async handle({ restaurant, id }: Params) {
    const menu = await restaurant
      .related('menus')
      .query()
      .where({ id })
      .preload('articles')
      .firstOrFail()
    await menu.delete()
    await DeleteArticleImage.handleArray(menu.articles)
  }
}
