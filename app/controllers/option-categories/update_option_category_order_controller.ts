import UpdateOptionCategoryOrder from '#actions/option-categories/update_option_category_order'
import { optionCategoryOrderValidator } from '#validators/option_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateOptionCategoryOrderController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(optionCategoryOrderValidator)
    await UpdateOptionCategoryOrder.handle({
      articleId: params.articleId,
      ids: data.ids,
      restaurant,
    })

    return response.redirect().back()
  }
}
