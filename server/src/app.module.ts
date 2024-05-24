import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import * as Joi from 'joi'
import * as fs from 'fs'
import * as path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AnyExceptionFilter } from './any-exception.filter'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { SocketModule } from './socket/socket.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MessagesModule } from './messages/messages.module'
import { MinIoModule } from './min-io/min-io.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().required(),
        JWT_TOKEN_ISSUER: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
      }),
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/hotaru'),
    SocketModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    MinIoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    consumer
      .apply(
        morgan('combined', { stream: accessLogStream }),
        express.json(),
        express.urlencoded({ extended: false }),
        cookieParser(),
        express.static('public'),
        LoggerMiddleware,
      )
      .forRoutes('*')
  }
}
