import type { OptionCategoryTypeId } from '#enums/option_category_type'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Option from './option.js'
import Article from './article.js'
import OptionCategoryType from './option_category_type.js'

export default class OptionCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare typeId: OptionCategoryTypeId

  @column()
  declare order: number

  @column()
  declare articleId: string

  @belongsTo(() => OptionCategoryType)
  declare type: BelongsTo<typeof OptionCategoryType>

  @belongsTo(() => Article)
  declare article: BelongsTo<typeof Article>

  @hasMany(() => Option)
  declare options: HasMany<typeof Option>
}
