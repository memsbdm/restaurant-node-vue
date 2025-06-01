import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'
import Category from './category.js'
import OptionCategory from './option_category.js'

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

  @hasMany(() => OptionCategory)
  declare optionCategories: HasMany<typeof OptionCategory>
}
