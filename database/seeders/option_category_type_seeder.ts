import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { rolesDbValues } from '#enums/option_category_type'
import ArticleOptionType from '#models/option_category_type'

export default class extends BaseSeeder {
  async run() {
    await ArticleOptionType.createMany(rolesDbValues)
  }
}
