import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PlacesAutocompleteController = () =>
  import('#controllers/providers/place_autocomplete_controller')

router
  .post('/api/v1/google/places-autocomplete', [PlacesAutocompleteController, 'handle'])
  .use(middleware.auth())
  .as('api.google.autocomplete')
