import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurant_invites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table
        .bigInteger('restaurant_id')
        .references('restaurants.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .bigInteger('invited_by_user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.bigInteger('canceled_by_user_id').references('users.id').onDelete('SET NULL')
      table.string('email', 254).notNullable()
      table.integer('role_id').unsigned().references('roles.id').onDelete('CASCADE').notNullable()
      table.timestamp('accepted_at')
      table.timestamp('canceled_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
