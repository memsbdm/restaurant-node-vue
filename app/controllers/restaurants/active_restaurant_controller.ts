import SetActiveRestaurant from '#actions/restaurants/http/set_active_restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ActiveRestaurantController {
  constructor(protected setActiveRestaurant: SetActiveRestaurant) {}

  async handle({ params, response }: HttpContext) {
    this.setActiveRestaurant.handle({ id: params.id })
    return response.redirect().toPath('/')
  }
}
