import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_GUARD } from '@nestjs/core'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User, UserSchema } from '../users/user.schema'
import { UsersService } from '../users/users.service'
import jwtConfig from '../common/config/jwt.config'
import { AccessTokenGuard } from './guards/access-token.guard'

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    UsersService,
  ],
})
export class AuthModule {}
