import GetArticle from '#actions/articles/get_article'
import GetMenu from '#actions/menus/get_menu'
import GetOptionCategoryTypes from '#actions/option-category-types/get_option_category_types'
import ArticleDto from '#dtos/article'
import CategoryDto from '#dtos/category'
import OptionCategoryTypeDto from '#dtos/option_category_type'
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
      optionCategoryTypes: async () => {
        const optionCategoryTypes = await GetOptionCategoryTypes.handle()
        return OptionCategoryTypeDto.fromArray(optionCategoryTypes)
      },
    })
  }
}
