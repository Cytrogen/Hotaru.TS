import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'

@Injectable()
export class SocketService {
  private server: Server

  initialize(server: Server) {
    this.server = server
  }

  sendMessage(event: string, message: any) {
    this.server.emit(event, message)
  }
}
