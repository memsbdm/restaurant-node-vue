import UpdateOptionCategory from '#actions/option-categories/update_option_category'
import { optionCategoryValidator } from '#validators/option_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateOptionCategoryController {
  async handle({ params, request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(optionCategoryValidator)
    await UpdateOptionCategory.handle({
      articleId: params.articleId,
      optionCategoryId: params.optionCategoryId,
      data,
      restaurant,
    })

    session.flash('success', 'Option category updated successfully')

    return response.redirect().back()
  }
}
