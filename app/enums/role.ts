export const RestaurantUserRole = {
  Admin: 1,
  User: 2,
} as const

export type RestaurantUserRoleId = (typeof RestaurantUserRole)[keyof typeof RestaurantUserRole]

export const RestaurantUserRoleText = {
  [RestaurantUserRole.Admin]: 'Admin',
  [RestaurantUserRole.User]: 'User',
} as const

export const rolesDbValues = [
  {
    id: RestaurantUserRole.Admin,
    name: RestaurantUserRoleText[RestaurantUserRole.Admin],
  },
  {
    id: RestaurantUserRole.User,
    name: RestaurantUserRoleText[RestaurantUserRole.User],
  },
]
