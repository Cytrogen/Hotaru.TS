import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  senderId: string

  @Prop({ required: true })
  receiverId: string

  @Prop({ required: true })
  text: string

  @Prop({ required: true, default: Date.now })
  timestamp: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)
