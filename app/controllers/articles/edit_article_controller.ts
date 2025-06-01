import GetArticle from '#actions/articles/get_article'
import GetMenu from '#actions/menus/get_menu'
import ArticleDto from '#dtos/article'
import CategoryDto from '#dtos/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditArticleController {
  async render({ params, restaurant, inertia }: HttpContext) {
    return inertia.render('articles/edit', {
      article: async () => {
        const article = await GetArticle.handle({
          restaurant,
          id: params.id,
        })
        return new ArticleDto(article)
      },
      categories: async () => {
        const { categories } = await GetMenu.handle({
          id: params.menuId,
          restaurant,
        })
        return CategoryDto.fromArray(categories)
      },
      menuId: params.menuId,
    })
  }
}
