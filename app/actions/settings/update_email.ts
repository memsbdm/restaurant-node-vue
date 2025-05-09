import User from '#models/user'
import { updateEmailValidator } from '#validators/setting'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  data: Infer<typeof updateEmailValidator>
}

export default class UpdateEmail {
  static async handle({ user, data }: Params) {
    await User.verifyCredentials(user.email, data.password)
    user.email = data.email
    user.isVerified = false
    // TODO: delete all confirmation mail tokens
    // TODO: send confirmation mail
    return user.save()
  }
}
