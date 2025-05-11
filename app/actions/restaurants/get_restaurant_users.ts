import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
}

export default class GetRestaurantUsers {
  static handle({ restaurant }: Params) {
    return restaurant.related('users').query().orderBy('createdAt')
  }
}
