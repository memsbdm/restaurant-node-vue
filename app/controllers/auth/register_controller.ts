import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }
}
