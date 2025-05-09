import type Currency from '#models/currency'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class CurrencyDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare code: string

  constructor(currency?: Currency) {
    super()

    if (!currency) return
    this.id = currency.id
    this.name = currency.name
    this.code = currency.code
  }
}
