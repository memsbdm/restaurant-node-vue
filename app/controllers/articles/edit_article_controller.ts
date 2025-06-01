import GetArticle from '#actions/articles/get_article'
import GetMenu from '#actions/menus/get_menu'
import ArticleDto from '#dtos/article'
import CategoryDto from '#dtos/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditArticleController {
  async render({ params, restaurant, inertia }: HttpContext) {
    const article = await GetArticle.handle({
      restaurant,
      id: params.id,
    })

    const { categories } = await GetMenu.handle({
      id: params.menuId,
      restaurant,
    })

    // TODO: async with inertia
    return inertia.render('articles/edit', {
      article: new ArticleDto(article),
      categories: CategoryDto.fromArray(categories),
      menuId: params.menuId,
    })
  }
}
