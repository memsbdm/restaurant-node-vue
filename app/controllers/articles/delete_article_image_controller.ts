import DeleteArticleImage from '#actions/articles/delete_article_image'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteArticleImageController {
  async handle({ params, response, restaurant }: HttpContext) {
    await DeleteArticleImage.handle({
      id: params.id,
      restaurant,
    })

    return response.redirect().back()
  }
}
