import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import { MEDIA_OPTIONS } from './constants';
import { MediaEntity } from './entities/media.entity';
import { MediaDataLoader } from './dataloaders/media.dataloader';
import { MediaOptions } from './media.interface';
import { MediaRepository } from './repositories/media.repository';
import { MediaMutationsResolver } from './resolvers/media_mutations.resolver';
import { MediaQueriesResolver } from './resolvers/media_queries.resolver';
import { MediaService } from './services/media.service';
import { MediaFieldResolver } from './resolvers/media_field.resolver';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import { CqrsModule } from '@nestjs/cqrs';
import { ImageResizeHandler } from './handlers/image-resize.handler';
import { SharpService } from './services/sharp.service';
import { extname, basename } from 'path';
// import { nanoid } from 'nanoid';
import fs from 'fs';
import deburr from 'lodash/deburr';
import kebabCase from 'lodash/kebabCase';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  controllers: [MediaController],
  imports: [CqrsModule, TypeOrmModule.forFeature([MediaEntity, MediaRepository])],
  providers: [
    MediaMutationsResolver,
    MediaService,
    MediaDataLoader,
    MediaFieldResolver,
    MediaQueriesResolver,
    ImageResizeHandler,
  ],
  exports: [MediaService, MediaDataLoader],
})
export class MediaModule implements OnModuleInit {
  static register(options: MediaOptions): DynamicModule {
    let storage: StorageEngine;
    const id = 'nanoid()';

    if (options?.driver === 's3') {
      const s3 = new S3Client({
        /**
         *
         */
        // accessKeyId: options.accessKeyId,
        /**
         *
         */
        // secretAccessKey: options.secretAccessKey,
        /**
         * Timeout 1 minute
         */
        // httpOptions: { timeout: 60 * 60 * 1000 },
      });

      storage = multerS3({
        s3: s3,
        bucket: options.bucketName,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        key: function (req, file, cb) {
          const fileExtName = extname(file.originalname);
          const fileName = basename(file.originalname, fileExtName);
          cb(null, `${id}_${kebabCase(deburr(fileName))}${fileExtName}`);
        },
      });
    } else {
      if (!options?.uploadDir) {
        Logger.error('Upload dir must be config');
      } else {
        if (!existsSync(options.uploadDir)) mkdirSync(options.uploadDir, { recursive: true, mode: '0777' });
      }
      storage = diskStorage({
        destination: (_req, file, callback) => {
          const imageDir = `${options.uploadDir}/${id}`;
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir);
          }
          callback(null, imageDir);
        },
        filename: (_req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const fileName = basename(file.originalname, fileExtName);
          callback(null, `${kebabCase(deburr(fileName))}${fileExtName}`);
        },
      });
    }

    return {
      module: MediaModule,
      imports: [
        MulterModule.register({
          storage,
        }),
      ],
      providers: [
        {
          provide: MEDIA_OPTIONS,
          useValue: options,
        },
        SharpService,
      ],
    };
  }

  onModuleInit() {
    // Logger.log(`The module has been initialized.`);
  }
}
