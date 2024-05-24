import { Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { MinIoService } from './min-io.service'
import { UploadFile } from './min-io.interface'
import { Public } from '../common/decorator/public.decorator'
import { FilePipe } from '../common/pipe/file.pipe'

@Controller('min-io')
export class MinIoController {
  constructor(private readonly minioService: MinIoService) {}

  @Public()
  @Get('getFile')
  async getFile(@Query('name') name: string) {
    const { url } = await this.minioService.getFile(name)
    return url
  }

  @Public()
  @Get('download')
  async downloadFile(@Query('name') name: string, @Res() res: Response) {
    const { url, stat } = await this.minioService.getFile(name)
    const response: AxiosResponse = await axios.get(url, { responseType: 'stream' })
    res.setHeader('Content-Type', stat.metaData['Context-Type'])
    response.data.pipe(res)
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  @UsePipes(new FilePipe())
  async uploadMinio(@UploadedFile() files: UploadFile[]) {
    return await this.minioService.uploadFiles(files)
  }
}
