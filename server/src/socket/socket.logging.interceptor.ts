import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class SocketLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Context:', context)
    console.log('Next:', next)

    // const client = context.switchToWs().getClient()
    const event = context.switchToWs().getData()

    console.log('Received socket event:', context.getHandler().name, '   Event data:', event)

    return next.handle().pipe(tap(() => console.log('After socket event:', context.getHandler().name)))
  }
}
