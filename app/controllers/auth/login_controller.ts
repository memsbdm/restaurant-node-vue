import Login from '#actions/auth/http/login'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  @inject()
  async handle({ request, response }: HttpContext, login: Login) {
    const data = await request.validateUsing(loginValidator)
    const user = await login.handle({ data })

    if (!user) {
      return response.redirect().back()
    }

    return response.redirect().toRoute('menus.create.render')
  }
}
