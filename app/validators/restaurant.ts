import vine from '@vinejs/vine'

export const createRestaurantValidator = vine.compile(
  vine.object({
    id: vine.string().unique(async (db, value, field) => {
      const exists = await db
        .from('restaurants')
        .where('place_id', value)
        .where('is_verified', true)
        .select('id')
        .first()

      if (exists) {
        return false
      }

      const isPending = await db
        .from('restaurant_users')
        .where('user_id', field.meta.userId)
        .join('restaurants', 'restaurants.id', 'restaurant_users.restaurant_id')
        .where('restaurants.place_id', value)
        .first()

      return !isPending
    }),
  })
)

export const updateRestaurantValidator = vine.compile(
  vine.object({
    alias: vine.string().maxLength(30),
    phone: vine
      .string()
      .nullable()
      .transform((input) => input?.replace(/\s+/g, '')),
    description: vine.string().nullable(),
  })
)
