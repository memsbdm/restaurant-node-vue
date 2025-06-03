import CreateOptionCategory from '#actions/option-categories/create_option_category'
import { optionCategoryValidator } from '#validators/option_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateOptionCategoryController {
  async handle({ params, request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(optionCategoryValidator)
    await CreateOptionCategory.handle({
      articleId: params.articleId,
      data,
      restaurant,
    })

    session.flash('success', 'Option category created successfully')

    return response.redirect().back()
  }
}
