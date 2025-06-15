import { BaseModelDto } from '@adocasts.com/dto/base'
import OptionCategoryDto from './option_category.js'
import Option from '#models/option'
import RestaurantDto from './restaurant.js'

export default class OptionDto extends BaseModelDto {
  declare id: string
  declare name: string
  declare priceInCents: number
  declare order: number
  declare optionCategoryId: string

  declare optionCategory: OptionCategoryDto | null
  declare restaurantId: string
  declare restaurant: RestaurantDto | null
  constructor(option?: Option) {
    super()

    if (!option) return
    this.id = option.id
    this.name = option.name
    this.priceInCents = option.priceInCents
    this.order = option.order
    this.optionCategoryId = option.optionCategoryId

    this.optionCategory = option.optionCategory && new OptionCategoryDto(option.optionCategory)

    this.restaurantId = option.restaurantId
    this.restaurant = option.restaurant && new RestaurantDto(option.restaurant)
  }
}
