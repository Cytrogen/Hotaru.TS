import { IsString, MinLength } from 'class-validator'

/**
 * Data transfer object for login user.
 */
export class LoginUserDto {
  @IsString()
  @MinLength(6)
  username: string

  @IsString()
  @MinLength(8)
  password: string
}
