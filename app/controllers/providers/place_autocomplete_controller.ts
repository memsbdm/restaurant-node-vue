import PlaceAutocomplete from '#actions/providers/place_autocomplete'
import { placeAutocompleteValidator } from '#validators/providers'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlacesAutocompleteController {
  @inject()
  async handle({ request }: HttpContext, placeAutocomplete: PlaceAutocomplete) {
    const headers = request.headers()
    headers.accept = 'application/json'

    const data = await request.validateUsing(placeAutocompleteValidator)
    return await placeAutocomplete.handle({ data })
  }
}
