import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import Register from '#actions/auth/http/register'
import { inject } from '@adonisjs/core'

export default class RegisterController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  @inject()
  async handle({ request, response }: HttpContext, register: Register) {
    const data = await request.validateUsing(registerValidator)
    await register.handle({ data })

    return response.redirect().toRoute('restaurants.create.render')
  }
}
