import OptionCategoryType from '#models/option_category_type'

export default class GetOptionCategoryTypes {
  static handle() {
    return OptionCategoryType.query().orderBy('id', 'asc')
  }
}
