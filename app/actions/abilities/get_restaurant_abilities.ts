import { Role } from '#enums/role'

type Params = {
  roleId: number
}

export type RestaurantAbilities = {
  edit: boolean
  destroy: boolean
  manageUsers: boolean
}

export default class GetRestaurantAbilities {
  static handle({ roleId }: Params): RestaurantAbilities {
    return {
      edit: this.canEdit(roleId),
      destroy: this.canDestroy(roleId),
      manageUsers: this.canManageUsers(roleId),
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
