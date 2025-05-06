import UpdateCategory from '#actions/categories/update_category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateCategoryController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(categoryValidator)
    await UpdateCategory.handle({
      categoryId: params.categoryId,
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
