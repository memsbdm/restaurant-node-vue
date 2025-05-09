import vine from '@vinejs/vine'

export const currencyValidator = vine.compile(
  vine.object({
    currencyId: vine.number().exists(async (db, value) => {
      const currency = await db.from('currencies').where('id', value).first()
      return !!currency
    }),
  })
)
