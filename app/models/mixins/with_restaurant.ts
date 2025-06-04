import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export const WithRestaurant = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  class MixinClass extends superclass {
    @column()
    declare restaurantId: string

    @belongsTo(() => BaseModel)
    declare restaurant: BelongsTo<typeof BaseModel>
  }

  return MixinClass
}
