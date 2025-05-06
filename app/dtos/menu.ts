import { BaseModelDto } from '@adocasts.com/dto/base'
import Menu from '#models/menu'
import RestaurantDto from './restaurant.js'

export default class MenuDto extends BaseModelDto {
  declare id: string
  declare createdAt: string
  declare updatedAt: string | null
  declare name: string
  declare isActive: boolean

  declare restaurantId: string
  declare restaurant: RestaurantDto | null

  declare meta: Record<string, any>

  constructor(menu?: Menu) {
    super()

    if (!menu) return
    this.id = menu.id
    this.createdAt = menu.createdAt.toISO()!
    this.updatedAt = menu.updatedAt?.toISO()!
    this.name = menu.name
    this.isActive = menu.isActive

    this.restaurantId = menu.restaurantId
    this.restaurant = menu.restaurant && new RestaurantDto(menu.restaurant)

    this.meta = menu.$extras
  }
}
