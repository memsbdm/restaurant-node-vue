import { activeCookieName } from '#config/restaurant'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

type Params = {
  id: string
}

@inject()
export default class SetActiveRestaurant {
  constructor(protected ctx: HttpContext) {}

  handle({ id }: Params) {
    this.ctx.restaurantId = id
    this.ctx.response.cookie(activeCookieName, id)
  }
}
