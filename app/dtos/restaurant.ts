import { BaseModelDto } from '@adocasts.com/dto/base'
import Restaurant from '#models/restaurant'
import MenuDto from '#dtos/menu'
import CategoryDto from '#dtos/category'
import ArticleDto from '#dtos/article'
import RestaurantInviteDto from '#dtos/restaurant_invite'

export default class RestaurantDto extends BaseModelDto {
  declare id: string
  declare createdAt: string
  declare updatedAt: string
  declare name: string
  declare alias: string
  declare description: string | null
  declare address: string
  declare countryCode: string
  declare currencyId: number | null
  declare lat: number | null
  declare lng: number | null
  declare phone: string | null
  declare imageUrl: string | null
  declare isVerified: boolean
  declare placeId: string
  declare menus: MenuDto[]
  declare categories: CategoryDto[]
  declare articles: ArticleDto[]
  declare invites: RestaurantInviteDto[]

  constructor(restaurant?: Restaurant) {
    super()

    if (!restaurant) return
    this.id = restaurant.id
    this.createdAt = restaurant.createdAt.toISO()!
    this.updatedAt = restaurant.updatedAt.toISO()!
    this.name = restaurant.name
    this.alias = restaurant.alias
    this.description = restaurant.description
    this.address = restaurant.address
    this.countryCode = restaurant.countryCode
    this.currencyId = restaurant.currencyId
    this.lat = restaurant.lat
    this.lng = restaurant.lng
    this.phone = restaurant.phone
    this.imageUrl = restaurant.imageUrl
    this.isVerified = restaurant.isVerified
    this.placeId = restaurant.placeId
    this.menus = MenuDto.fromArray(restaurant.menus)
    this.categories = CategoryDto.fromArray(restaurant.categories)
    this.articles = ArticleDto.fromArray(restaurant.articles)
    this.invites = RestaurantInviteDto.fromArray(restaurant.invites)
  }
}
