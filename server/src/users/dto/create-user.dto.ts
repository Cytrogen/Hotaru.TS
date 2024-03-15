import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Data transfer object for creating a new user.
 */
export class CreateUserDto {
  @IsEmail()
  emailAddress: string;

  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
