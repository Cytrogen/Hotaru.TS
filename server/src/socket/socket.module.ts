import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SocketService } from './socket.service'
import { SocketGateway } from './socket.gateway'
import { MessagesModule } from '../messages/messages.module'
import { Message, MessageSchema } from '../messages/message.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MessagesModule,
  ],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
