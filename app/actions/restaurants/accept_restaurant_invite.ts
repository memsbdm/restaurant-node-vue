import ForbiddenException from '#exceptions/forbidden_exception'
import RestaurantInvite from '#models/restaurant_invite'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type Params = {
  inviteId: number
  user: User
}

export default class AcceptRestaurantInvite {
  static async handle({ inviteId, user }: Params) {
    const invite = await RestaurantInvite.findOrFail(inviteId)

    if (invite.email !== user.email) {
      throw new ForbiddenException('Your email does not match the invitation')
    }

    if (invite.acceptedAt || invite.canceledAt) {
      return {
        invite: null,
        state: 'errorsBag',
        message: 'This invitation is no longer valid',
      }
    }

    await db.transaction(async (trx) => {
      invite.useTransaction(trx)

      const restaurant = await invite.related('restaurant').query().firstOrFail()
      await restaurant.related('users').attach({
        [user.id]: {
          role_id: invite.roleId,
        },
      })

      invite.acceptedAt = DateTime.now()

      await invite.save()
    })

    return {
      invite,
      state: 'success',
      message: `Invitation successfully accepted`,
    }
  }
}
