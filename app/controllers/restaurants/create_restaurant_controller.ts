import CreateRestaurant from '#actions/restaurants/create_restaurant'
import { createRestaurantValidator } from '#validators/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'
import SetActiveRestaurant from '#actions/restaurants/http/set_active_restaurant'

@inject()
export default class CreateRestaurantController {
  constructor(
    protected setActiveRestaurant: SetActiveRestaurant,
    protected createRestaurant: CreateRestaurant
  ) {}

  render({ inertia }: HttpContext) {
    return inertia.render('restaurants/create')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const data = await request.validateUsing(createRestaurantValidator, {
      meta: {
        userId: auth.use('web').user!.id,
      },
      messagesProvider: new SimpleMessagesProvider({
        'database.unique': 'This place is already registered or pending approval.',
        'id.required':
          'Please select your restaurant from the list. If not in the list, please contact the support.',
      }),
    })
    const restaurant = await this.createRestaurant.handle({ user: auth.use('web').user!, data })
    this.setActiveRestaurant.handle({ id: restaurant.id })
    session.flash('success', 'Restaurant successfully added!')

    return response.redirect().toRoute('restaurants.currency.render', {
      id: restaurant.id,
    })
  }
}
