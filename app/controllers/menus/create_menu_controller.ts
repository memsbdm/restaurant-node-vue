import CreateMenu from '#actions/menus/create_menu'
import MenuDto from '#dtos/menu'
import { menuValidator } from '#validators/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateMenuController {
  async render({ inertia, restaurant }: HttpContext) {
    const menus = await restaurant.getMenus()

    return inertia.render('menus/index', {
      menus: MenuDto.fromArray(menus),
    })
  }

  async handle({ request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(menuValidator)
    const menu = await CreateMenu.handle({ restaurant, data })

    return response.redirect().toRoute('menus.show.render', { id: menu.id })
  }
}
