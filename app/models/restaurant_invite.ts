import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'
import Role from './role.js'

export default class RestaurantInvite extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare invitedByUserId: string

  @column()
  declare canceledByUserId: string | null

  @column()
  declare roleId: number

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare acceptedAt: DateTime | null

  @column.dateTime()
  declare canceledAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'invitedByUserId',
  })
  declare invitedByUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'canceledByUserId',
  })
  declare canceledByUser: BelongsTo<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
