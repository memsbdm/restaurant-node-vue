import Currency from '#models/currency'
import CurrencyCountry from '#models/currency_country'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
}

export default class GetCurrencies {
  static async handle({ restaurant }: Params) {
    const countryCurrencyId = await this.#getCountryCurrencyId(restaurant.countryCode)
    const currencies = await Currency.query().orderBy('code')

    return {
      countryCurrencyId,
      currencies,
    }
  }

  static async #getCountryCurrencyId(countryCode: string) {
    const currency = await CurrencyCountry.query().where('code', countryCode).first()
    return currency!.currencyId
  }
}
