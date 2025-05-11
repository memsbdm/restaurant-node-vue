import Restaurant from '#models/restaurant'
import User from '#models/user'
import env from '#start/env'
import { restaurantInviteValidator } from '#validators/restaurant'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  invitedByUserId: string
  data: Infer<typeof restaurantInviteValidator>
}

export default class SendRestaurantInvite {
  static async handle({ restaurant, invitedByUserId, data }: Params) {
    const invite = await restaurant.related('invites').create({
      invitedByUserId,
      ...data,
    })

    const invitedUser = await User.findBy('email', invite.email)

    const inviteUrl = router
      .builder()
      .params({ id: invite.id })
      .prefixUrl(env.get('APP_URL'))
      .makeSigned('restaurants.accept.invitation.handle')

    await mail.sendLater((message) => {
      message
        .to(invite.email)
        .subject(`You have been invited to join ${restaurant.name}`)
        .htmlView('emails/restaurant_invite', { restaurant, invitedUser, inviteUrl })
    })
  }
}
