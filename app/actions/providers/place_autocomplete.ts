import type { PlaceAutocompleteDto } from '#dtos/place_autocomplete'
import env from '#start/env'
import { placeAutocompleteValidator } from '#validators/providers'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof placeAutocompleteValidator>
}

const API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

@inject()
export default class PlaceAutocomplete {
  async handle({ data }: Params): Promise<PlaceAutocompleteDto[]> {
    const url = new URL(API_URL)
    url.searchParams.append('input', data.input)
    url.searchParams.append('types', 'establishment')
    url.searchParams.append('key', env.get('GOOGLE_API_KEY'))

    const res = await fetch(url, {
      method: 'POST',
    })

    const json = (await res.json()) as { predictions: GooglePrediction[] }
    return json.predictions.map(
      (prediction) =>
        ({
          id: prediction.place_id,
          text: prediction.description,
        }) as PlaceAutocompleteDto
    )
  }
}

type GooglePrediction = {
  description: string
  matched_substrings: Match[]
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Match[]
    secondary_text: string
    secondary_text_matched_substrings: Match[]
  }
  terms: Term[]
  types: string[]
}

type Match = {
  length: number
  offset: number
}

type Term = {
  offset: string
  value: string
}
