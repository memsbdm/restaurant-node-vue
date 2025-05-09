import UpdateEmail from '#actions/settings/update_email'
import { updateEmailValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateEmailController {
  async handle({ request, response, session, auth }: HttpContext) {
    const data = await request.validateUsing(updateEmailValidator)
    const user = auth.use('web').user!

    if (data.email === user.email) {
      session.flash('success', 'You are already using the submitted email')
      return response.redirect().back()
    }

    await UpdateEmail.handle({ user, data })

    session.flash('success', 'Your email has been updated')

    return response.redirect().back()
  }
}
