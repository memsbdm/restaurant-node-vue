import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_options'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name', 30).notNullable()
      table
        .integer('type_id')
        .references('article_option_types.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.bigIncrements('article_id').references('articles.id').onDelete('CASCADE').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
