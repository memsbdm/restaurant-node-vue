import CreateCategory from '#actions/categories/create_category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateCategoryController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(categoryValidator)
    await CreateCategory.handle({
      menuId: params.menuId,
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
