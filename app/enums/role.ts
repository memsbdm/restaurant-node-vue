export const Role = {
  Admin: 1,
  User: 2,
} as const

export type RoleId = (typeof Role)[keyof typeof Role]

export const RoleText = {
  [Role.Admin]: 'Admin',
  [Role.User]: 'User',
} as const

export const rolesDbValues = [
  {
    id: Role.Admin,
    name: RoleText[Role.Admin],
  },
  {
    id: Role.User,
    name: RoleText[Role.User],
  },
]
