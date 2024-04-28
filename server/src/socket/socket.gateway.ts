import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketService } from './socket.service'

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

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.initialize(server)
  }

  @SubscribeMessage('privateMessageSent')
  handlePrivateMessage(@MessageBody() data: any, client: Socket) {
    console.log('Received private message:', data, 'from', client)
  }
}
