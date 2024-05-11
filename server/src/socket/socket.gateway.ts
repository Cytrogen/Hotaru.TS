import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { SocketService } from './socket.service'
import { MessagesService } from '../messages/messages.service'

@WebSocketGateway(3001, {
  allowEIO3: true,
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly socketService: SocketService,
    private messagesService: MessagesService,
  ) {}

  afterInit(server: Server) {
    this.socketService.initialize(server)
  }

  @SubscribeMessage('privateMessageSent')
  async handlePrivateMessage(@MessageBody() data: any): Promise<void> {
    await this.messagesService.create({ senderId: data.senderId, receiverId: data.receiverId, text: data.text })
  }
}
