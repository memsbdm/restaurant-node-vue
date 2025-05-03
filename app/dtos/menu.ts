import { BaseModelDto } from '@adocasts.com/dto/base'
import Menu from '#models/menu'
import RestaurantDto from './restaurant.js'

export default class MenuDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare order: number
  declare isActive: boolean

  declare restaurantId: number
  declare restaurant: RestaurantDto | null

  constructor(menu?: Menu) {
    super()

    if (!menu) return
    this.id = menu.id
    this.name = menu.name
    this.order = menu.order
    this.isActive = menu.isActive

    this.restaurantId = menu.restaurantId
    this.restaurant = menu.restaurant && new RestaurantDto(menu.restaurant)
  }
}
