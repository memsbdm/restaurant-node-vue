import type User from '#models/user'

type Params = {
  user: User
  id: string
}

export default class DeleteRestaurant {
  static async handle({ user, id }: Params) {
    const restaurant = await user
      .related('restaurants')
      .query()
      .where('restaurants.id', id)
      .firstOrFail()

    await restaurant.delete()

    return restaurant
  }
}
