import CreateOptionCategory from '#actions/option-categories/create_option_category'
import { optionCategoryValidator } from '#validators/option_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateOptionCategoryController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(optionCategoryValidator)
    await CreateOptionCategory.handle({
      articleId: params.articleId,
      data,
      restaurant,
    })

    return response.redirect().back()
  }
}
