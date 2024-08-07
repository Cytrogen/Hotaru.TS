import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

/**
 * User schema.
 *
 * Schema is a class that defines the structure of the document stored in the collection.
 */
@Schema()
export class User extends Document {
  // @Prop() decorator marks the class property as a schema property.
  // This property is required and unique.
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: false, unique: true })
  emailAddress: string

  @Prop({ required: true })
  password: string

  @Prop({ required: false })
  birthYear: string

  @Prop({ required: false })
  birthMonth: string

  @Prop({ required: false })
  birthDay: string

  @Prop()
  nickname: string

  @Prop()
  avatar: string
}

// Create a schema for the User class.
// Schema defines the structure of the document stored in the collection.
export const UserSchema = SchemaFactory.createForClass(User)
