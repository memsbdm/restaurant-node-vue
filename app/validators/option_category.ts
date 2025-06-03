import vine from '@vinejs/vine'

export const optionCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    typeId: vine.number(),
  })
)

export const optionCategoryOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.string()),
  })
)
