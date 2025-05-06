import { BaseModel, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import { WithRestaurant } from './mixins/with_restaurant.js'
import { compose } from '@adonisjs/core/helpers'
import type { HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import Article from './article.js'
import { DateTime } from 'luxon'

export default class Menu extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare isActive: boolean

  @hasMany(() => Category)
  declare categories: HasMany<typeof Category>

  @hasManyThrough([() => Article, () => Category])
  declare articles: HasManyThrough<typeof Article>
}
