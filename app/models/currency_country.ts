import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Currency from './currency.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CurrencyCountry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare currencyId: number

  @belongsTo(() => Currency)
  declare currency: BelongsTo<typeof Currency>
}
