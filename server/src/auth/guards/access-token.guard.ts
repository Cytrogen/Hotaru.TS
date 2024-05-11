import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { REQUEST_USER_KEY } from '../../common'
import jwtConfig from '../../common/config/jwt.config'
import { IS_PUBLIC_KEY } from '../../common/decorator/public.decorator'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Check if the user has a valid JWT token.
   * If the route is marked as public, the user is allowed to access it without a token.
   *
   * @param context
   * @return A boolean indicating whether the user has a valid JWT token.
   *
   * @example
   * const canAccess = await this.canActivate(ExecutionContext)
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is marked as public.
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) return true

    // Extract the JWT token from the request header.
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) return false
    console.log('token', token)
    try {
      request[REQUEST_USER_KEY] = await this.jwtService.verifyAsync(token, this.jwtConfiguration)
    } catch (error) {
      console.log(error)

      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Your session has expired. Please log in again.')
      }

      throw new UnauthorizedException()
    }

    return true
  }

  /**
   * Extract the JWT token from the request header.
   *
   * @param request
   * @return The JWT token from the request header.
   * @private
   *
   * @example
   * const token = this.extractTokenFromHeader(Request)
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization']
    const [, token] = authorization?.split(' ') ?? []
    return token
  }
}
