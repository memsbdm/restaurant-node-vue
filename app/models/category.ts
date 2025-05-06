import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'
import Article from './article.js'
import Menu from './menu.js'

export default class Category extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare order: number

  @column()
  declare isDefault: boolean

  @column()
  declare menuId: string

  @belongsTo(() => Menu)
  declare menu: BelongsTo<typeof Menu>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>
}
