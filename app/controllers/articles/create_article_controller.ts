import CreateArticle from '#actions/articles/create_article'
import GetMenu from '#actions/menus/get_menu'
import CategoryDto from '#dtos/category'
import { articleValidator } from '#validators/article'
import { withRestaurantMetaData } from '#validators/helpers/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticleController {
  async render({ inertia, params, restaurant }: HttpContext) {
    const { categories } = await GetMenu.handle({ id: params.menuId, restaurant })
    return inertia.render('articles/create', {
      menuId: params.menuId,
      categoryId: params.categoryId,
      categories: CategoryDto.fromArray(categories),
    })
  }

  async handle({ request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(
      articleValidator,
      withRestaurantMetaData(restaurant.id)
    )

    await CreateArticle.handle({
      restaurant,
      data,
    })

    session.flash('success', 'Article created')

    // TODO: redirect to edit page of the article
    if (data.hasOptions) {
    }

    return response.redirect().toRoute('menus.show.render', { id: data.menuId })
  }
}
