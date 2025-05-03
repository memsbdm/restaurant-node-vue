import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { RoleId } from '#enums/role'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoleId

  @column()
  declare name: string
}
