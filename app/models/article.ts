import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'
import Category from './category.js'

export default class Article extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare priceInCents: number

  @column()
  declare imageUrl: string | null

  @column()
  declare order: number

  @column()
  declare categoryId: string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
