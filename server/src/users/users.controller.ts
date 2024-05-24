import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'

// Define a controller for the /users route.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * An API endpoint that allows users to retrieve a user profile by their username.
   *
   * @param username
   */
  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username)
  }

  @Get('userid/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.usersService.findByUserId(userId)
  }

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string, @Res() res: Response) {
    const user = await this.usersService.findByUserId(userId)
    if (user && user.avatar) {
      return res.redirect(user.avatar)
    } else {
      return res.status(404).json({ message: 'User or avatar not found.' })
    }
  }
}
