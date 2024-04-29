import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
  ) {}

  /**
   * Find a user by their email address.
   *
   * @param emailAddress
   * @returns The user profile that matches the given email address.
   */
  async findByEmail(emailAddress: string): Promise<User | null> {
    return this.usersModel.findOne({ emailAddress }).exec()
  }

  /**
   * Find a user by their username.
   *
   * @param username
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.usersModel.findOne({ username }).select('-password').exec()
  }

  /**
   * Find all users.
   *
   * @returns An array of all user profiles.
   */
  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec()
  }
}
