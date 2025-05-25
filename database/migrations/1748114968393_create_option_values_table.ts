import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'option_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name', 30).notNullable()
      table.integer('price_in_cents').notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table
        .bigInteger('option_id')
        .references('article_options.id')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
