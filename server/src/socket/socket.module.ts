import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { SocketGateway } from './socket.gateway'
import { MessagesModule } from '../messages/messages.module'

@Module({
  imports: [MessagesModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
