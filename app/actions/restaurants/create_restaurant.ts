import { Role } from '#enums/role'
import Restaurant from '#models/restaurant'
import type User from '#models/user'
import { createRestaurantValidator } from '#validators/restaurant'
import { Infer } from '@vinejs/vine/types'
import PlaceDetails from '#actions/providers/place_details'
import db from '@adonisjs/lucid/services/db'

type Params = {
  user: User
  data: Infer<typeof createRestaurantValidator>
}

export default class CreateRestaurant {
  async handle({ user, data }: Params) {
    const createRestaurantDto = await PlaceDetails.handle({ data })

    return db.transaction(async (trx) => {
      const restaurant = await Restaurant.create(createRestaurantDto, { client: trx })
      await CreateRestaurant.assignAdmin(restaurant, user)
      return restaurant
    })
  }

  private static assignAdmin(restaurant: Restaurant, user: User) {
    return restaurant.related('users').attach({
      [user.id]: {
        role_id: Role.Admin,
      },
    })
  }
}
