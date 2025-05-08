export type CreateRestaurantDto = {
  name: string
  alias: string
  address: string
  lat?: number
  lng?: number
  phone?: string
  placeId: string
  countryCode: string
}
