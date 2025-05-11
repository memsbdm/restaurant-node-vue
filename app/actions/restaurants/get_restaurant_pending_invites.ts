import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
}

export default class GetRestaurantPendingInvites {
  static async handle({ restaurant }: Params) {
    return restaurant
      .related('invites')
      .query()
      .whereNull('acceptedAt')
      .whereNull('canceledAt')
      .orderBy('createdAt', 'desc')
  }
}
