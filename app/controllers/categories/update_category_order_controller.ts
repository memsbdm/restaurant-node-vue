import UpdateCategoryOrder from '#actions/categories/update_category_order'
import { categoryOrderValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateCategoryOrderController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const { ids } = await request.validateUsing(categoryOrderValidator)

    await UpdateCategoryOrder.handle({
      menuId: params.menuId,
      restaurant,
      ids,
    })

    return response.redirect().back()
  }
}
