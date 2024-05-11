import { Controller, Get, Param, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { MessagesService } from './messages.service'
import { REQUEST_USER_KEY } from '../common'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':receiverId')
  async getMessages(@Request() req: ExpressRequest, @Param('receiverId') receiverId: string) {
    const senderId = req[REQUEST_USER_KEY].id
    console.log('senderId: ', senderId)
    return await this.messagesService.getMessages(senderId, receiverId)
  }
}
