import { BaseModelDto } from '@adocasts.com/dto/base'
import VerifyEmailToken from '#models/verify_email_token'
import UserDto from '#dtos/user'

export default class VerifyEmailTokenDto extends BaseModelDto {
  declare id: number
  declare userId: number
  declare value: string
  declare createdAt: string
  declare updatedAt: string
  declare expiresAt: string
  declare user: UserDto | null
  declare isValid: boolean

  constructor(verifyEmailToken?: VerifyEmailToken) {
    super()

    if (!verifyEmailToken) return
    this.id = verifyEmailToken.id
    this.userId = verifyEmailToken.userId
    this.value = verifyEmailToken.value
    this.createdAt = verifyEmailToken.createdAt.toISO()!
    this.updatedAt = verifyEmailToken.updatedAt.toISO()!
    this.expiresAt = verifyEmailToken.expiresAt.toISO()!
    this.user = verifyEmailToken.user && new UserDto(verifyEmailToken.user)
    this.isValid = verifyEmailToken.isValid
  }
}
