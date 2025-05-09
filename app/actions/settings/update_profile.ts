import User from '#models/user'
import { updateProfileValidator } from '#validators/setting'
import { Infer } from '@vinejs/vine/types'

type Params = {
  user: User
  data: Infer<typeof updateProfileValidator>
}

export default class UpdateProfile {
  static handle({ user, data }: Params) {
    return user.merge(data).save()
  }
}
