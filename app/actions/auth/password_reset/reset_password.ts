import { Infer } from '@vinejs/vine/types'
import { passwordResetValidator } from '#validators/auth'
import VerifyPasswordResetToken from '#actions/auth/password_reset/verify_password_reset_token'
import ExpirePasswordResetTokens from '#actions/auth/password_reset/expire_password_reset_tokens'
import ForbiddenException from '#exceptions/forbidden_exception'

type Params = {
  data: Infer<typeof passwordResetValidator>
}

export default class ResetPassword {
  static async handle({ data }: Params) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: data.value })

    if (!isValid) {
      throw new ForbiddenException('Invalid or expired password reset token')
    }

    await user!.merge({ password: data.password }).save()
    await ExpirePasswordResetTokens.handle({ user: user! })

    return user!
  }
}
