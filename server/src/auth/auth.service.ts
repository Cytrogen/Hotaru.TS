import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { User } from '../users/user.schema'
import jwtConfig from '../common/config/jwt.config'
import { LoginUserDto, RegisterUserDto } from './dto'
import { ActiveUserData } from './interfaces/active-user-data.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Generate a JWT token for the user.
   *
   * @param user
   * @returns A JWT token that can be used to authenticate the user.
   *
   * @example
   * await this.usersService.generateTokens(user)
   */
  async generateTokens(user: User) {
    const token = await this.signToken<Partial<ActiveUserData>>(user._id, { name: user.username })
    return { token }
  }

  /**
   * Sign a JWT token with the user's ID and payload.
   *
   * @param userId
   * @param payload
   * @private
   * @returns A JWT token that can be used to authenticate the user.
   *
   * @example
   * await this.signToken(userId, { name: string })
   */
  private async signToken<T>(userId: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    )
  }

  /**
   * Register a new user.
   * It first generates a unique ID and then hashes the user's password.
   * Finally, it creates a new user profile and saves it to the database.
   *
   * @param createUserDto
   * @returns The user profile that was created.
   *
   * @example
   * const result = await this.usersService.register(createUserDto)
   *
   * @throws Error - If the user could not be saved to the database.
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
    return await newUser
      .save()
      .then(() => console.log('User registered successfully'))
      .catch((error: any) => {
        console.log('Failed to register user', error)
        throw new Error('Failed to register user')
      })
  }

  /**
   * Validate a user's login.
   * It first checks if there is a user that matches the given username.
   * Then, it compares the password hash with the user's password.
   * Finally, it signs a JWT token with the user's username and ID.
   *
   * @param loginUserDto
   * @returns A JWT token that can be used to authenticate the user.
   *
   * @example
   * const result = await this.usersService.login(loginUserDto)
   *
   * @throws UnauthorizedException - If the username or password is invalid.
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersModel.findOne({
      username: loginUserDto.username,
    })
    if (!user) throw new UnauthorizedException('The username is invalid')

    const passwordValid = await bcrypt.compare(loginUserDto.password, user.password)
    if (!passwordValid) throw new UnauthorizedException('The password is invalid')

    // Signing the JWT with the user data.
    // This way, we can get the user's identity information from the JWT.
    return await this.generateTokens(user)
  }
}
