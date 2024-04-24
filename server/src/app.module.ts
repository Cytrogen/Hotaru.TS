import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AnyExceptionFilter } from './any-exception.filter'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { SocketModule } from './socket/socket.module'
import { UsersModule } from './users/users.module'

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
    consumer
      .apply(
        morgan('dev'),
        express.json(),
        express.urlencoded({ extended: false }),
        cookieParser(),
        express.static('public'),
        LoggerMiddleware,
      )
      .forRoutes('*')
  }
}
