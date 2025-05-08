import DeleteArticle from '#actions/articles/delete_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteArticleController {
  async handle({ params, response, restaurant, session }: HttpContext) {
    await DeleteArticle.handle({
      id: params.id,
      restaurant,
    })
    session.flash('success', 'Article deleted from menu')

    return response.redirect().back()
  }
}
