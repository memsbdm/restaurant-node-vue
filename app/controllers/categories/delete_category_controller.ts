import DeleteCategory from '#actions/categories/delete_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteCategoryController {
  async handle({ params, response, restaurant }: HttpContext) {
    await DeleteCategory.handle({
      menuId: params.menuId,
      categoryId: params.categoryId,
      restaurant,
    })

    return response.redirect().back()
  }
}
