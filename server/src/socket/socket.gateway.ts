import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Server, Socket } from 'socket.io'
import { SocketService } from './socket.service'
import { Message } from '../messages/message.schema'

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
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  afterInit(server: Server) {
    this.socketService.initialize(server)
  }

  @SubscribeMessage('privateMessageSent')
  async handlePrivateMessage(@MessageBody() data: any, client: Socket) {
    console.log('Received private message:', data, 'from', client)

    const message = new this.messageModel({
      senderId: data.senderId,
      receiverId: data.receiverId,
      text: data.text,
    })

    await message
      .save()
      .then(async (message) => {
        console.log('Message saved:', message)
      })
      .catch((error: any) => {
        console.log('Error saving message:', error)
      })
  }
}
