import ArticleDto from './article.js'

export default class CreateArticleDto {
  declare name: string
  declare description: string
  declare price: number | undefined
  declare categoryId: string

  constructor(article?: ArticleDto) {
    if (!article) return

    this.name = article.name
    this.description = article.description
    this.price = article.priceInCents / 100
    this.categoryId = article.categoryId
  }
}
