import vine from '@vinejs/vine'

export const optionValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    priceInCents: vine.number().min(0),
  })
)
