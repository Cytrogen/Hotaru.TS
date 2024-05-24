import { Injectable, PipeTransform } from '@nestjs/common'
import * as path from 'path'
import { generateRandomNumber } from '../index'
import { UploadFile } from '../../min-io/min-io.interface'

@Injectable()
export class FilePipe implements PipeTransform {
  transform(files: UploadFile[]) {
    return files.map((file) => {
      const ext = path.extname(file.originalName)
      return {
        ...file,
        originalName: `${Date.now()}${generateRandomNumber()}${ext}`,
      }
    })
  }
}
