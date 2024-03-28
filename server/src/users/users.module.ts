import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { User, UserSchema } from './user.schema'
import { UsersControllers } from './users.controllers'
import { UsersService } from './users.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersControllers],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
