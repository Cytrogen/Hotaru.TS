import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, NextFunction } from 'express'

/**
 * Middleware that logs the request method and URL to the console.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, next: NextFunction) {
    console.log('Request...', req.method, req.originalUrl)
    next()
  }
}
