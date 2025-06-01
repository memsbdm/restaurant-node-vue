export const OptionCategoryType = {
  Select: 1,
  Radio: 2,
} as const

export type OptionCategoryTypeId = (typeof OptionCategoryType)[keyof typeof OptionCategoryType]

export const RoleText = {
  [OptionCategoryType.Select]: 'Select',
  [OptionCategoryType.Radio]: 'Radio',
} as const

export const rolesDbValues = [
  {
    id: OptionCategoryType.Select,
    name: RoleText[OptionCategoryType.Select],
  },
  {
    id: OptionCategoryType.Radio,
    name: RoleText[OptionCategoryType.Radio],
  },
]
