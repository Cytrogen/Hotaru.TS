import { Controller, Get, Param, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':senderId/:receiverId')
  async getMessages(
    @Request() req: ExpressRequest,
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.messagesService.getMessages(senderId, receiverId)
  }
}
