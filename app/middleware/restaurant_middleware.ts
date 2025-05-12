import GetActiveRestaurant from '#actions/restaurants/http/get_active_restaurant'
import { activeCookieName } from '#config/restaurant'
import Restaurant from '#models/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import db from '@adonisjs/lucid/services/db'
import RestaurantDto from '#dtos/restaurant'
import GetAbilities, { type Abilities } from '#actions/abilities/get_abilities'

@inject()
export default class RestaurantMiddleware {
  constructor(protected getActiveRestaurant: GetActiveRestaurant) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user!
    try {
      ctx.restaurantId = ctx.request.cookie(activeCookieName)

      const restaurant = await this.getActiveRestaurant.handle()

      const { roleId } = await db
        .from('restaurant_users')
        .where('restaurant_id', restaurant.id)
        .where('user_id', user.id)
        .select('role_id as roleId')
        .firstOrFail()

      ctx.restaurant = restaurant
      ctx.roleId = roleId
      ctx.can = GetAbilities.handle({ roleId })
    } catch (_) {
      ctx.session.reflash()
      return ctx.response.redirect().toRoute('restaurants.create.render')
    }

    if (!ctx.restaurant.currencyId) {
      return ctx.response.redirect().toRoute('restaurants.currency.render', {
        id: ctx.restaurant.id,
      })
    }

    const restaurants = await user.related('restaurants').query().orderBy('name')
    ctx.inertia.share({
      restaurant: new RestaurantDto(ctx.restaurant),
      restaurants: RestaurantDto.fromArray(restaurants),
      can: ctx.can,
    })

    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    restaurantId?: string
    restaurant: Restaurant
    roleId: number
    can: Abilities
  }
}
