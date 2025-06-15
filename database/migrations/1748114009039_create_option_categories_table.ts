import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'option_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name', 30).notNullable()
      table
        .integer('type_id')
        .references('option_category_types.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.bigint('article_id').references('articles.id').onDelete('CASCADE').notNullable()
      table.integer('max_selection_count').unsigned().nullable()
      table
        .bigInteger('restaurant_id')
        .references('restaurants.id')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
