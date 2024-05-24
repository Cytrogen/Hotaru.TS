import { Injectable } from '@nestjs/common'
import { InjectMinio } from 'nestjs-minio'
import * as minio from 'minio'
import { UploadFile } from './min-io.interface'

@Injectable()
export class MinIoService {
  private static readonly bucketName = 'hotaru'
  constructor(@InjectMinio() private readonly minioClient: minio.Client) {}

  /**
   * Upload a file to a bucket
   *
   * @param files
   */
  async uploadFiles(files: UploadFile[]) {
    const upload = async (file: UploadFile) => {
      const res = await this.minioClient.putObject(MinIoService.bucketName, file.originalName, file.buffer, file.size, {
        'Context-Type': file.mimeType,
      })
      const host = process.env.PORT || 4000
      return {
        ...res,
        originalName: file.originalName,
        url: `http://localhost:${host}/api/min-io/download?name=${file.originalName}`,
      }
    }
    return await Promise.all(files.map(upload))
  }

  /**
   * Get a file from a bucket.
   *
   * @param objectName
   * @returns { url, stat } The URL of the file and the file's metadata.
   */
  async getFile(objectName: string): Promise<{ url: string; stat: any }> {
    const [url, stat] = await Promise.all([
      this.minioClient.presignedGetObject(MinIoService.bucketName, objectName, 24 * 60 * 60),
      this.minioClient.statObject(MinIoService.bucketName, objectName),
    ])
    return { url, stat }
  }

  /**
   * Get the default avatar.
   */
  async getDefaultAvatar(): Promise<string> {
    const defaultAvatarName = 'Hotaru_default_avatar'
    const { url } = await this.getFile(defaultAvatarName)
    return url
  }
}
