import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'dgram';

@WebSocketGateway(3001, {
  allowEIO3: true,
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('privateMessageSent')
  handlePrivateMessage(@MessageBody() data: any, client: Socket) {
    console.log('Received private message:', data, 'from', client);
  }
}
