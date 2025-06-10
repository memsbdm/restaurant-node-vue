import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { optionCategoryTypesDbValues } from '#enums/option_category_type'
import OptionCategoryType from '#models/option_category_type'

export default class extends BaseSeeder {
  async run() {
    await OptionCategoryType.createMany(optionCategoryTypesDbValues)
  }
}
