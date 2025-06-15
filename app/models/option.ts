import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OptionCategory from './option_category.js'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'

export default class Option extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare priceInCents: number

  @column()
  declare order: number

  @column()
  declare optionCategoryId: string

  @belongsTo(() => OptionCategory)
  declare optionCategory: BelongsTo<typeof OptionCategory>
}
