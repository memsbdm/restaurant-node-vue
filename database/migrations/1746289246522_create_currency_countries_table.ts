import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'currency_countries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 2).notNullable()
      table.integer('currency_id').notNullable().references('currencies.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
