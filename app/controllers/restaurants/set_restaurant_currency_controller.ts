import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import GetCurrencies from '#actions/restaurants/get_currencies'
import Restaurant from '#models/restaurant'
import { currencyValidator } from '#validators/currency'
import SetRestaurantCurrency from '#actions/restaurants/set_restaurant_currency'
import RestaurantDto from '#dtos/restaurant'
import CurrencyDto from '#dtos/currency'

@inject()
export default class SetRestaurantCurrencyController {
  async render({ inertia, params, response }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    if (restaurant.currencyId) {
      return response.redirect().toRoute('menus.create.render')
    }

    const { currencies, countryCurrencyId } = await GetCurrencies.handle({ restaurant })
    return inertia.render('restaurants/currency', {
      restaurant: new RestaurantDto(restaurant),
      currencies: CurrencyDto.fromArray(currencies),
      countryCurrencyId,
    })
  }

  async handle({ request, response, params }: HttpContext) {
    const restaurant = await Restaurant.findOrFail(params.id)
    const data = await request.validateUsing(currencyValidator)
    await SetRestaurantCurrency.handle({ restaurant, data })

    return response.redirect().toRoute('menus.create.render')
  }
}
