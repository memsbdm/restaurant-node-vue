import type { HttpContext } from '@adonisjs/core/http'
import ActiveMenu from '#actions/menus/active_menu'

export default class ActiveMenuController {
  async handle({ params, response, restaurant }: HttpContext) {
    await ActiveMenu.handle({ restaurant, menuId: params.id })

    return response.redirect().back()
  }
}
