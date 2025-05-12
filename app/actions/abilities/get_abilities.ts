import GetRestaurantAbilities, { type RestaurantAbilities } from './get_restaurant_abilities.js'

type Params = {
  roleId: number
}

export type Abilities = {
  restaurant: RestaurantAbilities
}

export default class GetAbilities {
  static handle({ roleId }: Params): Abilities {
    return {
      restaurant: GetRestaurantAbilities.handle({ roleId }),
    }
  }
}
