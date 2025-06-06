import DeleteOptionCategory from '#actions/option-categories/delete_option_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteOptionCategoryController {
  async handle({ params, response, restaurant, session }: HttpContext) {
    await DeleteOptionCategory.handle({
      optionCategoryId: params.optionCategoryId,
      articleId: params.articleId,
      restaurant,
    })

    session.flash('success', 'Option category deleted successfully')

    return response.redirect().back()
  }
}
