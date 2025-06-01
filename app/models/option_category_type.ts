import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { type OptionCategoryTypeId } from '#enums/option_category_type'
import OptionCategory from './option_category.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class OptionCategoryType extends BaseModel {
  @column({ isPrimary: true })
  declare id: OptionCategoryTypeId

  @column()
  declare name: string

  @hasMany(() => OptionCategory)
  declare optionCategories: HasMany<typeof OptionCategory>
}
