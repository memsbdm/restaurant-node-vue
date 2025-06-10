import vine from '@vinejs/vine'

export const optionCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    typeId: vine.number(),
    maxSelectionCount: vine.number().max(10).optional(),
  })
)

export const optionCategoryOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.string()),
  })
)
