import { Controller, Post, Body, Get, Res, HttpStatus, HttpException } from '@nestjs/common'
import { UsersService } from './users.service'
import { RegisterUserDto, LoginUserDto } from './dto'
import { Response } from 'express';

// Define a controller for the /users route.
@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return 'All users'
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    const existingUser = await this.usersService.findByEmail(registerUserDto.emailAddress)
    if (existingUser) {
      throw new HttpException('Email address already in use', HttpStatus.BAD_REQUEST)
    }

    // Check if the email address is provided.
    if (!registerUserDto.emailAddress) {
      throw new HttpException('Email address is required', HttpStatus.BAD_REQUEST)
    }

    try {
      const user = this.usersService.register(registerUserDto)

      res.status(HttpStatus.OK).json({
        status: '00000',
        message: 'User registered successfully',
        user: user,
      })
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'U0100',
        message: 'Failed to register user',
      })
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }
}
