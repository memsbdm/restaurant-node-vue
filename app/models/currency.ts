import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CurrencyCountry from './currency_country.js'

export default class Currency extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @hasMany(() => CurrencyCountry)
  declare countries: HasMany<typeof CurrencyCountry>
}
