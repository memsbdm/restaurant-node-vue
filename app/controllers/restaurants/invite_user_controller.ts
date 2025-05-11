import SendRestaurantInvite from '#actions/restaurants/send_restaurant_invite'
import { withRestaurantMetaData } from '#validators/helpers/restaurant'
import { restaurantInviteValidator } from '#validators/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'

@inject()
export default class InviteUserController {
  async handle({ auth, request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(restaurantInviteValidator, {
      messagesProvider: new SimpleMessagesProvider({
        'database.unique': 'This email is already a member or is pending for approval.',
      }),
      meta: withRestaurantMetaData(restaurant.id).meta,
    })

    await SendRestaurantInvite.handle({
      restaurant,
      invitedByUserId: auth.use('web').user!.id,
      data,
    })

    session.flash('success', 'Invitation has been sent')
    return response.redirect().back()
  }
}
