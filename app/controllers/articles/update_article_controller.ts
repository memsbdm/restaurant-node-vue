import UpdateArticle from '#actions/articles/update_article'
import { articleValidator } from '#validators/article'
import { withRestaurantMetaData } from '#validators/helpers/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateArticleController {
  async handle({ params, request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(
      articleValidator,
      withRestaurantMetaData(restaurant.id)
    )

    await UpdateArticle.handle({
      id: params.id,
      restaurant,
      data,
    })

    session.flash('success', 'Article updated')

    return response.redirect().back()
  }
}
