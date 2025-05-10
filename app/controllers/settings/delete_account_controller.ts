import Logout from '#actions/auth/http/logout'
import DeleteAccount from '#actions/settings/delete_account'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class DeleteAccountController {
  @inject()
  async handle({ request, response, session, auth }: HttpContext, logout: Logout) {
    const user = auth.use('web').user!
    const validator = vine.compile(vine.object({ password: vine.string() }))
    const { password } = await request.validateUsing(validator)

    await User.verifyCredentials(user.email, password)
    await DeleteAccount.handle({ user })
    await logout.handle()

    session.flash('success', 'Your account has been deleted')

    return response.redirect().toRoute('auth.register.render')
  }
}
