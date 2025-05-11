import UpdateRestaurant from '#actions/restaurants/update_restaurant'
import { updateRestaurantValidator } from '#validators/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateRestaurantController {
  render({ inertia }: HttpContext) {
    return inertia.render('settings/restaurant')
  }

  async handle({ params, request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(updateRestaurantValidator)

    await UpdateRestaurant.handle({
      user: auth.user!,
      id: params.id,
      data,
    })

    session.flash('success', 'Your restaurant has been updated')

    return response.redirect().back()
  }
}
