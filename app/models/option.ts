import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OptionCategory from './option_category.js'

export default class Option extends BaseModel {
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
