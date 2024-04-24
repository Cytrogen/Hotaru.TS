import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { Public } from '../common/decorator/public.decorator'

// Define a controller for the /users route.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * An API endpoint that returns all users.
   */
  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }
}
