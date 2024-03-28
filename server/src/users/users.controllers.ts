import { Controller, Post, Body, Get, Res, HttpStatus, HttpException } from '@nestjs/common'
import { UsersService } from './users.service'
import { RegisterUserDto, LoginUserDto } from './dto'

// Define a controller for the /users route.
@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }
}
