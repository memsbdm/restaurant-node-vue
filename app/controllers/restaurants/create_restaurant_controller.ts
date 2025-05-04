import CreateRestaurant from '#actions/restaurants/create_restaurant'
import { createRestaurantValidator } from '#validators/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'

export default class CreateRestaurantController {
  render({ inertia }: HttpContext) {
    return inertia.render('restaurants/create')
  }

  @inject()
  async handle(
    { auth, request, response, session }: HttpContext,
    createRestaurant: CreateRestaurant
  ) {
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
    await createRestaurant.handle({ user: auth.use('web').user!, data })
    session.flash('success', 'Restaurant successfully added!')

    return response.redirect().toRoute('home.render')
  }
}
