import Restaurant from '#models/restaurant'
import { DateTime } from 'luxon'

type Params = {
  restaurant: Restaurant
  canceledByUserId: string
  inviteId: number
}

export default class CancelRestaurantInvite {
  static async handle({ restaurant, canceledByUserId, inviteId }: Params) {
    const invite = await restaurant.related('invites').query().where('id', inviteId).firstOrFail()
    invite.canceledAt = DateTime.now()
    invite.canceledByUserId = canceledByUserId
    await invite.save()

    return invite
  }
}
