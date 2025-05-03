import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'email_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.bigInteger('user_id').references('users.id').notNullable().onDelete('CASCADE')
      table.string('email_old', 254).notNullable()
      table.string('email_new', 254).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
