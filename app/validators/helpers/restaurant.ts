import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'

export type RestaurantMetaData = {
  restaurantId: string
}

export function withRestaurantMetaData(id: string) {
  return {
    meta: {
      restaurantId: id,
    },
  }
}

export function existsInRestaurant(table: string, column: string = 'id') {
  return async (db: Database, value: string | number, field: FieldContext) => {
    const result = await db
      .from(table)
      .select(column)
      .where(column, value)
      .where('restaurant_id', field.meta.restaurantId)
      .first()

    return !!result
  }
}
