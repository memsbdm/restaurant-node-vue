import GetMenu from '#actions/menus/get_menu'
import MenuDto from '#dtos/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShowMenuController {
  async render({ params, inertia, restaurant }: HttpContext) {
    const { menu } = await GetMenu.handle({ id: params.id, restaurant })

    return inertia.render('menus/show', { menu: new MenuDto(menu) })
  }
}
