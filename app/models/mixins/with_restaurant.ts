import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Restaurant from '#models/restaurant'

export const WithRestaurant = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  class MixinClass extends superclass {
    @column()
    declare restaurantId: number

    @belongsTo(() => Restaurant)
    declare restaurant: BelongsTo<typeof Restaurant>
  }

  return MixinClass
}
