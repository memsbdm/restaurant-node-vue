import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api.js'

export const tuyau = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})
