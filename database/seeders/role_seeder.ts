import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { rolesDbValues } from '#enums/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany(rolesDbValues)
  }
}
