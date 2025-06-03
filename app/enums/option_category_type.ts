export const OptionCategoryType = {
  Multiple: 1,
  Unique: 2,
} as const

export type OptionCategoryTypeId = (typeof OptionCategoryType)[keyof typeof OptionCategoryType]

export const OptionCategoryTypeText = {
  [OptionCategoryType.Multiple]: 'Multiple',
  [OptionCategoryType.Unique]: 'Unique',
} as const

export const rolesDbValues = [
  {
    id: OptionCategoryType.Multiple,
    name: OptionCategoryTypeText[OptionCategoryType.Multiple],
  },
  {
    id: OptionCategoryType.Unique,
    name: OptionCategoryTypeText[OptionCategoryType.Unique],
  },
]
