import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { RegisterUserDto, LoginUserDto } from './dto'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { Public } from '../common/decorator/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * An API endpoint that allows users to register a new account.
   *
   * @param registerUserDto Data transfer object for creating a new user, including the user's email address, username, password, and birthday.
   * @param res
   * @returns
   * @public This route is public and can be accessed without authentication.
   *
   * @example keep in mind that api is global prefix
   * POST api/users/register
   *
   */
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    const existingUser = await this.usersService.findByEmail(registerUserDto.emailAddress)
    if (existingUser) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'U0102',
        message: 'Email address already in use',
      })
    }

    try {
      const user = await this.authService.register(registerUserDto)

      res.status(HttpStatus.OK).json({
        status: '00000',
        message: 'User registered successfully',
        user: user,
      })
    } catch (error) {
      console.log(error)
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'U0100',
        message: 'Failed to register user due to an unknown error',
      })
    }
  }

  /**
   * An API endpoint that allows users to log in to their account.
   * If the user's credentials are valid, a JWT token is returned.
   *
   * @param loginUserDto Data transfer object for logging in a user, including the user's username and password.
   * @param res
   * @returns
   * @Public This route is public and can be accessed without authentication.
   *
   * @example keep in mind that api is global prefix
   * POST api/users/login
   *
   */
  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const resultToken = await this.authService.login(loginUserDto)
      const user = await this.usersService.findByUsername(loginUserDto.username)

      res.status(HttpStatus.OK).json({
        status: '00000',
        message: 'User logged in successfully',
        token: resultToken,
        userId: user._id,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          status: 'U0202',
          message: 'The username or password is invalid',
        })
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: 'U0200',
          message: 'Failed to log in user due to an unknown error',
        })
      }
    }
  }
}
