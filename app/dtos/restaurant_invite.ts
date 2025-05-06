import { BaseModelDto } from '@adocasts.com/dto/base'
import RestaurantInvite from '#models/restaurant_invite'
import UserDto from '#dtos/user'
import RoleDto from '#dtos/role'
import RestaurantDto from './restaurant.js'

export default class RestaurantInviteDto extends BaseModelDto {
  declare id: string
  declare invitedByUserId: string
  declare canceledByUserId: string | null
  declare roleId: number
  declare email: string
  declare createdAt: string
  declare updatedAt: string
  declare acceptedAt: string | null
  declare canceledAt: string | null
  declare invitedByUser: UserDto | null
  declare canceledByUser: UserDto | null
  declare role: RoleDto | null

  declare restaurantId: string
  declare restaurant: RestaurantDto | null

  constructor(restaurantInvite?: RestaurantInvite) {
    super()

    if (!restaurantInvite) return
    this.id = restaurantInvite.id
    this.invitedByUserId = restaurantInvite.invitedByUserId
    this.canceledByUserId = restaurantInvite.canceledByUserId
    this.roleId = restaurantInvite.roleId
    this.email = restaurantInvite.email
    this.createdAt = restaurantInvite.createdAt.toISO()!
    this.updatedAt = restaurantInvite.updatedAt.toISO()!
    this.acceptedAt = restaurantInvite.acceptedAt?.toISO()!
    this.canceledAt = restaurantInvite.canceledAt?.toISO()!
    this.invitedByUser =
      restaurantInvite.invitedByUser && new UserDto(restaurantInvite.invitedByUser)
    this.canceledByUser =
      restaurantInvite.canceledByUser && new UserDto(restaurantInvite.canceledByUser)
    this.role = restaurantInvite.role && new RoleDto(restaurantInvite.role)
    this.restaurantId = restaurantInvite.restaurantId
    this.restaurant = restaurantInvite.restaurant && new RestaurantDto(restaurantInvite.restaurant)
  }
}
