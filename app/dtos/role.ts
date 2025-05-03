import { BaseModelDto } from '@adocasts.com/dto/base'
import Role from '#models/role'
import type { RoleId } from '#enums/role'

export default class RoleDto extends BaseModelDto {
  declare id: RoleId
  declare name: string

  constructor(role?: Role) {
    super()

    if (!role) return
    this.id = role.id
    this.name = role.name
  }
}
