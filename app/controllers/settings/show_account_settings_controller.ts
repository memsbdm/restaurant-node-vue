import type { HttpContext } from '@adonisjs/core/http'

export default class ShowAccountSettingsController {
  async render({ inertia }: HttpContext) {
    return inertia.render('settings/account')
  }
}
