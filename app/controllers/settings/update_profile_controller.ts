import UpdateProfile from '#actions/settings/update_profile'
import { updateProfileValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateProfileController {
  render({ inertia }: HttpContext) {
    return inertia.render('settings/profile')
  }

  async handle({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)

    await UpdateProfile.handle({
      user: auth.use('web').user!,
      data,
    })

    session.flash('success', 'Your profile has been updated')

    return response.redirect().back()
  }
}
