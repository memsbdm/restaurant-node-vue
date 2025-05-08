import CreateArticle from '#actions/articles/create_article'
import { articleValidator } from '#validators/article'
import { withRestaurantMetaData } from '#validators/helpers/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticleController {
  async handle({ request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(
      articleValidator,
      withRestaurantMetaData(restaurant.id)
    )

    await CreateArticle.handle({
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
