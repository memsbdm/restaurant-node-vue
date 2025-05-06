import vine from '@vinejs/vine'

export const menuValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
  })
)

export const activeMenuValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
