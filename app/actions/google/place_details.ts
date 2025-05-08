import type { CreateRestaurantDto } from '#dtos/create_restaurant'
import env from '#start/env'
import { createRestaurantValidator } from '#validators/restaurant'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof createRestaurantValidator>
}

const API_URL = 'https://places.googleapis.com/v1/places/'

export default class PlaceDetails {
  static async handle({ data }: Params) {
    const url = new URL(API_URL + data.id)
    url.searchParams.append('fields', 'displayName,formattedAddress,location,nationalPhoneNumber')
    url.searchParams.append('key', env.get('GOOGLE_API_KEY'))

    const res = await fetch(url)
    const json = (await res.json()) as GooglePlaceDetails

    const dto: CreateRestaurantDto = {
      name: json.displayName.text,
      alias: json.displayName.text,
      address: json.formattedAddress,
      lat: json.location?.latitude,
      lng: json.location?.longitude,
      phone: json.nationalPhoneNumber?.replace(/\s+/g, ''),
      placeId: data.id,
    }
    return dto
  }
}

type GooglePlaceDetails = {
  nationalPhoneNumber?: string
  formattedAddress: string
  location?: {
    latitude: number
    longitude: number
  }
  displayName: {
    text: string
    languageCode: string
  }
}
