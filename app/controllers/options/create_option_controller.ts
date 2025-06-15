import CreateOption from '#actions/options/create_option'
import { optionValidator } from '#validators/option'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateOptionController {
  async handle({ request, response, restaurant, session, params }: HttpContext) {
    const data = await request.validateUsing(optionValidator)

    await CreateOption.handle({
      restaurant,
      data,
      optionCategoryId: params.optionCategoryId,
    })

    session.flash('success', 'Option created')

    return response.redirect().back()
  }
}
