import Currency from '#models/currency'
import CurrencyCountry from '#models/currency_country'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const API_URL = 'https://api.currencyapi.com/v3/currencies'

    const url = new URL(API_URL)
    url.searchParams.append('apikey', env.get('CURRENCY_API_KEY'))
    url.searchParams.append('type', 'fiat')

    const response = await fetch(url)
    const data = (await response.json()) as CurrencyApiResponse

    // if countries is empty, skip
    for (const currency of Object.values(data.data)) {
      if (currency.countries.length === 0) {
        continue
      }

      // insert currency into the database
      const createdCurrency = await Currency.create({
        name: currency.name,
        code: currency.code,
      })

      // for each country, insert into currency_country
      for (const country of currency.countries) {
        await CurrencyCountry.create({
          code: country,
          currencyId: createdCurrency.id,
        })
      }
    }
  }
}

type CurrencyApiResponse = {
  data: {
    [key: string]: {
      name: string
      code: string
      countries: string[]
    }
  }
}
