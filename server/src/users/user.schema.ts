import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Merges Mongoose's Document type with User type.
export type UserDocument = User & Document

// @Schema() decorator marks this class as Mongoose schema.
@Schema()
export class User {
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
}

// Create a schema for the User class.
// Schema defines the structure of the document stored in the collection.
export const UserSchema = SchemaFactory.createForClass(User)
