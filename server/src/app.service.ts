import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  /**
   * @returns "Welcome to HotaruTS!!"
   */
  getHello(): string {
    return 'Welcome to HotaruTS!!'
  }
}
