import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name', 30).notNullable()
      table.boolean('is_active').defaultTo(false)
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
