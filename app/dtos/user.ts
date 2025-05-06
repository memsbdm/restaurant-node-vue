import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'
import PasswordResetTokenDto from '#dtos/password_reset_token'
import VerifyEmailTokenDto from '#dtos/verify_email_token'

export default class UserDto extends BaseModelDto {
  declare id: string
  declare createdAt: string
  declare updatedAt: string | null
  declare fullName: string
  declare email: string
  declare isVerified: boolean
  declare passwordResetTokens: PasswordResetTokenDto[]
  declare verifyEmailTokens: VerifyEmailTokenDto[]

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt?.toISO()!
    this.fullName = user.fullName
    this.email = user.email
    this.isVerified = user.isVerified
    this.passwordResetTokens = PasswordResetTokenDto.fromArray(user.passwordResetTokens)
    this.verifyEmailTokens = VerifyEmailTokenDto.fromArray(user.verifyEmailTokens)
  }
}
