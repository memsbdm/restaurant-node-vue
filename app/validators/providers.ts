import vine from '@vinejs/vine'

export const placeAutocompleteValidator = vine.compile(
  vine.object({
    input: vine.string(),
  })
)
