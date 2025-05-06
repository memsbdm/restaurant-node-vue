import UpdateMenu from '#actions/menus/update_menu'
import { menuValidator } from '#validators/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateMenuController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(menuValidator)

    await UpdateMenu.handle({
      id: params.id,
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
