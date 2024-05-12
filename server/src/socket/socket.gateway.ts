import { UseInterceptors } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketService } from './socket.service'
import { SocketLoggingInterceptor } from './socket.logging.interceptor'
import { MessagesService } from '../messages/messages.service'

@WebSocketGateway(3001, {
  allowEIO3: true,
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
@UseInterceptors(SocketLoggingInterceptor)
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

  private userIdToSocketId = new Map<string, string>()

  @SubscribeMessage('connectUser')
  handleConnectUser(@MessageBody() userId: string, @ConnectedSocket() socket: Socket): void {
    this.userIdToSocketId.set(userId, socket.id)
    console.log('Connected user:', userId, '   socket id:', socket.id)
  }

  @SubscribeMessage('privateMessageSent')
  async handlePrivateMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<void> {
    const message = await this.messagesService.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      text: data.text,
    })
    const receiverSocketId = this.userIdToSocketId.get(data.receiverId)
    console.log('Receiver socket ID:', receiverSocketId)
    if (receiverSocketId) socket.to(receiverSocketId).emit('newPrivateMessage', message)
  }
}
