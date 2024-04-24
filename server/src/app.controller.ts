import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './common/decorator/public.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * This is a simple GET request that returns a string.
   *
   * @returns {string} A simple string.
   */
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
