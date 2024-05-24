import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MinioModule } from 'nestjs-minio-client'
import * as Joi from 'joi'
import { MinIoService } from './min-io.service'
import { MinIoController } from './min-io.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MINIO_ENDPOINT: Joi.string().required(),
        MINIO_PORT: Joi.number().required(),
        MINIO_ACCESS_KEY: Joi.string().required(),
        MINIO_SECRET_KEY: Joi.string().required(),
      }),
    }),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get<string>('MINIO_ENDPOINT'),
        port: configService.get<number>('MINIO_PORT'),
        useSSL: true,
        accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
        secretKey: configService.get<string>('MINIO_SECRET_KEY'),
      }),
    }),
  ],
  providers: [
    MinIoService,
    {
      provide: 'MINIO_CONNECTION',
      useValue: 'MINIO_CONNECTION',
    },
  ],
  exports: [MinIoService],
  controllers: [MinIoController],
})
export class MinIoModule {}
