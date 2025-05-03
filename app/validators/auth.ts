import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(254),
    email: vine
      .string()
      .maxLength(254)
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const exists = await db
          .from('users')
          .where('email', value)
          .andWhere('is_verified', true)
          .select('id')
          .first()
        return !exists
      }),
    password: vine.string().minLength(8),
  })
)
