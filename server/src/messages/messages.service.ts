import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message } from './message.schema'
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  /**
   * Get all messages between two users.
   *
   * @param senderId
   * @param receiverId
   */
  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageModel
      .find({
        senderId: senderId,
        receiverId: receiverId,
      })
      .exec()
  }

  /**
   * Create a new message.
   *
   * @param createMessageDto
   * @returns The created message.
   */
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto)
    return await createdMessage
      .save()
      .then(async (message) => {
        console.log('Message saved:', message)
        return message
      })
      .catch((error: any) => {
        console.log('Error saving message:', error)
        throw error
      })
  }
}
