import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message, MessageDocument } from './messages.schema'
import { CreateMessageDto } from './dto/create-message.dto'
import { SocketService } from '../socket/socket.service'

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private socketService: SocketService,
  ) {}

  /**
   * Create a new message.
   *
   * @param createMessageDto
   * @returns The created message.
   */
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto)
    await createdMessage.save()

    this.socketService.sendMessage('messageCreated', createdMessage)

    return createdMessage
  }
}
