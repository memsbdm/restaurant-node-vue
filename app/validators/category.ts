import vine from '@vinejs/vine'

export const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    description: vine.string().optional(),
  })
)

export const categoryOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.string()),
  })
)
