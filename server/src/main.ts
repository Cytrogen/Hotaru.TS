import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { Server } from 'socket.io'
import { AppModule } from './app.module'
import { RegisterUserDto } from './auth/dto'
import { UsersService } from './users/users.service'
import { MinIoService } from './min-io/min-io.service'
import { AuthService } from './auth/auth.service'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const usersService = app.get<UsersService>(UsersService)
  const minIoService = app.get<MinIoService>(MinIoService)
  const authService = app.get<AuthService>(AuthService)

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })

  // Set the global prefix for all routes.
  app.setGlobalPrefix('api')

  const server = app.getHttpServer()
  new Server(server)

  const dummyUser = await usersService.findByUsername('Dummy')
  const { url } = await minIoService.getFile('Hotaru_default_avatar.png')
  if (!dummyUser) {
    const dummyUserDto: RegisterUserDto = {
      username: 'Dummy',
      emailAddress: 'dummy@hotaru.icu',
      password: 'dummyPassword',
      birthYear: '2004',
      birthMonth: 'November',
      birthDay: '12',
      nickname: 'Dummy',
      avatar: url,
    }
    await authService.register(dummyUserDto)
    console.log('Dummy user created.')
  }

  await app.listen(process.env.PORT || 4000)
}

bootstrap().catch((err) => console.error(err))
