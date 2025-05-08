import UpdateArticleOrder from '#actions/articles/update_article_order'
import { articleOrderValidator } from '#validators/article'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateArticleOrderController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(articleOrderValidator)

    await UpdateArticleOrder.handle({
      menuId: params.menuId,
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
