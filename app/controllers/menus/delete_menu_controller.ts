import DeleteMenu from '#actions/menus/delete_menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteMenuController {
  async handle({ params, response, restaurant, session }: HttpContext) {
    await DeleteMenu.handle({ id: params.id, restaurant })
    session.flash('success', 'Menu deleted successfully')

    return response.redirect().toRoute('menus.create.render')
  }
}
