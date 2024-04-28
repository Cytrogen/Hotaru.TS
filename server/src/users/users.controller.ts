import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { Public } from '../common/decorator/public.decorator'

// Define a controller for the /users route.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * An API endpoint that allows users to retrieve a user profile by their username.
   *
   * @param username
   */
  @Public()
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username)
  }
}
