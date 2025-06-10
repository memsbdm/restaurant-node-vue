import { BaseModelDto } from '@adocasts.com/dto/base'
import ArticleDto from './article.js'
import type { OptionCategoryTypeId } from '#enums/option_category_type'
import OptionCategoryTypeDto from './option_category_type.js'
import type OptionCategory from '#models/option_category'
import OptionDto from './option.js'

export default class OptionCategoryDto extends BaseModelDto {
  declare id: string
  declare name: string
  declare typeId: OptionCategoryTypeId
  declare order: number
  declare articleId: string | null
  declare maxSelectionCount?: number

  declare article: ArticleDto | null
  declare type: OptionCategoryTypeDto | null
  declare options: OptionDto[] | null

  constructor(optionCategory?: OptionCategory) {
    super()

    if (!optionCategory) return
    this.id = optionCategory.id
    this.name = optionCategory.name
    this.typeId = optionCategory.typeId
    this.order = optionCategory.order
    this.articleId = optionCategory.articleId
    this.maxSelectionCount = optionCategory.maxSelectionCount ?? undefined

    this.article = optionCategory.article && new ArticleDto(optionCategory.article)
    this.type = optionCategory.type && new OptionCategoryTypeDto(optionCategory.type)
    this.options = optionCategory.options && OptionDto.fromArray(optionCategory.options)
  }
}
