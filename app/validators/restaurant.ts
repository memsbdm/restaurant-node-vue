import vine from '@vinejs/vine'
import { emailRule } from './auth.js'
import { RestaurantMetaData } from './helpers/restaurant.js'

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

export const restaurantInviteValidator = vine.withMetaData<RestaurantMetaData>().compile(
  vine.object({
    email: emailRule.clone().unique(async (db, value, field) => {
      const inviteMatch = await db
        .from('restaurant_invites')
        .where('restaurant_id', field.meta.restaurantId)
        .where('email', value)
        .whereNull('accepted_at')
        .whereNull('canceled_at')
        .select('id')
        .first()

      if (inviteMatch) return false

      const restaurantMatch = await db
        .from('restaurant_users')
        .join('users', 'restaurant_users.user_id', 'users.id')
        .where('restaurant_users.restaurant_id', field.meta.restaurantId)
        .where('users.email', value)
        .select('users.id')
        .first()

      return !restaurantMatch
    }),

    roleId: vine.number().exists(async (db, value) => {
      const match = await db.from('roles').where('id', value).select('id').first()
      return !!match
    }),
  })
)
