import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import RestaurantInvite from './restaurant_invite.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Menu from './menu.js'
import Category from './category.js'
import Article from './article.js'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare alias: string

  @column()
  declare description: string | null

  @column()
  declare address: string

  @column()
  declare countryCode: string

  @column()
  declare lat: number | null

  @column()
  declare lng: number | null

  @column()
  declare phone: string | null

  @column()
  declare imageUrl: string | null

  @column()
  declare isVerified: boolean

  @column()
  declare placeId: string

  @hasMany(() => Menu)
  declare menus: HasMany<typeof Menu>

  @hasMany(() => Category)
  declare categories: HasMany<typeof Category>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>

  @hasMany(() => RestaurantInvite)
  declare invites: HasMany<typeof RestaurantInvite>

  @manyToMany(() => User, {
    pivotTable: 'restaurant_users',
    pivotColumns: ['role_id'],
  })
  declare users: ManyToMany<typeof User>

  getMenus() {
    return (<Restaurant>this).related('menus').query().orderBy('created_at', 'asc')
  }
}
