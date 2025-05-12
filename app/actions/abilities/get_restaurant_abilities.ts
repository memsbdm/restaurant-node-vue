import { Role } from '#enums/role'

type Params = {
  roleId: number
}

export type RestaurantAbilities = {
  canEdit: boolean
  canDestroy: boolean
  canManageUsers: boolean
}

export default class GetRestaurantAbilities {
  static handle({ roleId }: Params): RestaurantAbilities {
    return {
      canEdit: this.canEdit(roleId),
      canDestroy: this.canDestroy(roleId),
      canManageUsers: this.canManageUsers(roleId),
    }
  }

  static canEdit(roleId: number) {
    return roleId === Role.Admin
  }

  static canDestroy(roleId: number) {
    return roleId === Role.Admin
  }

  static canManageUsers(roleId: number) {
    return roleId === Role.Admin
  }
}
