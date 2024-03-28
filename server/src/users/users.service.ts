import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { RegisterUserDto, LoginUserDto } from './dto'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   * It first generates a unique ID and then hashes the user's password.
   * Finally, it creates a new user profile and saves it to the database.
   * @param createUserDto
   */
  async register(createUserDto: RegisterUserDto): Promise<void | User> {
    const id = uuidv4()
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const newUser = new this.usersModel({
      id,
      ...createUserDto,
      password: hashedPassword,
    })

    // Save the user to the database.
    let savedUser: void | User
    try {
      savedUser = await newUser.save().then(() => console.log('User registered successfully'))
    } catch (err) {
      console.error(err)
    }
    return savedUser
  }

  /**
   * Validate a user's login.
   * It first checks if there is a user that matches the given username.
   * If no user is found, or if the password provided does not match the hashed password stored in the database, an UnauthorizedException is thrown.
   * If the username and password are both valid, a JWT is generated and returned.
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersModel.findOne({
      username: loginUserDto.username,
    })
    if (!user) throw new UnauthorizedException('Invalid username or password')

    const passwordValid = await bcrypt.compare(loginUserDto.password, user.password)
    if (!passwordValid) throw new UnauthorizedException('Invalid username or password')

    // Signing the JWT with a username and user ID.
    // This way, we can get the user's identity information from the JWT.
    const payload = { username: user.username, sub: user.id }
    return { access_token: this.jwtService.sign(payload) }
  }

  /**
   * Find a user by their email address.
   * @param emailAddress
   */
  async findByEmail(emailAddress: string): Promise<User | null> {
    return this.usersModel.findOne({ emailAddress }).exec()
  }
}
