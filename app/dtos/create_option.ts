import OptionDto from './option.js'

export default class CreateOptionDto {
  declare name: string
  declare priceInCents: number
  declare optionCategoryId: string

  constructor(option?: OptionDto) {
    if (!option) return

    this.name = option.name
    this.priceInCents = option.priceInCents
    this.optionCategoryId = option.optionCategoryId
  }
}
