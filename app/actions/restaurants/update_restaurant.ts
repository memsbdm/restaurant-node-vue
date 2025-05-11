import type User from '#models/user'
import { updateRestaurantValidator } from '#validators/restaurant'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  id: string
  data: Infer<typeof updateRestaurantValidator>
}

export default class UpdateRestaurant {
  static async handle({ user, id, data }: Params) {
    const restaurant = await user
      .related('restaurants')
      .query()
      .where('restaurants.id', id)
      .firstOrFail()

    return restaurant.merge(data).save()
  }
}
