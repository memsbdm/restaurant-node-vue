import { BaseModelDto } from '@adocasts.com/dto/base'
import Category from '#models/category'
import MenuDto from '#dtos/menu'
import ArticleDto from './article.js'
import RestaurantDto from './restaurant.js'

export default class CategoryDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string | null
  declare order: number
  declare isDefault: boolean
  declare menuId: number
  declare menu: MenuDto | null

  declare restaurantId: number
  declare restaurant: RestaurantDto | null
  declare articles: ArticleDto[]

  constructor(category?: Category) {
    super()

    if (!category) return
    this.id = category.id
    this.name = category.name
    this.description = category.description
    this.order = category.order
    this.isDefault = category.isDefault
    this.menuId = category.menuId
    this.menu = category.menu && new MenuDto(category.menu)

    this.restaurantId = category.restaurantId
    this.restaurant = category.restaurant && new RestaurantDto(category.restaurant)
    this.articles = ArticleDto.fromArray(category.articles)
  }
}
