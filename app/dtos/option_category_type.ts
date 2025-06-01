import { BaseModelDto } from '@adocasts.com/dto/base'
import type { OptionCategoryTypeId } from '#enums/option_category_type'
import OptionCategoryType from '#models/option_category_type'

export default class OptionCategoryTypeDto extends BaseModelDto {
  declare id: OptionCategoryTypeId
  declare name: string

  constructor(type?: OptionCategoryType) {
    super()

    if (!type) return
    this.id = type.id
    this.name = type.name
  }
}
