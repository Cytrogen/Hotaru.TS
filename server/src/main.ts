import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })

  // Set the global prefix for all routes.
  app.setGlobalPrefix('api')

  const server = app.getHttpServer()
  new Server(server)

  await app.listen(process.env.PORT || 4000)
}

bootstrap().catch((err) => console.error(err))
