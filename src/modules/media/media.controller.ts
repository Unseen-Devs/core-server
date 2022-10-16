import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './services/media.service';
import { JwtAuthGuard } from 'src/guards/rest-auth.guard';
import { CurrentUserRest } from 'src/decorators/common.decorator';
import { MediaOptions, MulterFile } from './media.interface';
import { CommandBus } from '@nestjs/cqrs';
import { ImageResizeCommand } from './commands/image-resize.command';
import { thumbName } from './helpers';
import { BASE_URL } from 'src/helpers/environtment';
import { MEDIA_OPTIONS } from './constants';
import { MediaEntity } from './entities/media.entity';
import { ApolloError } from 'apollo-server-errors';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private commandBus: CommandBus,
    @Inject(MEDIA_OPTIONS) private readonly options: MediaOptions,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, callback) => {
        if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.mimetype)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: MulterFile, @CurrentUserRest('id') id: string) {
    const data: Partial<MediaEntity> = {
      name: file.originalname,
      ownerId: id,
      mimeType: file.mimetype,
      fileSize: file.size,
    };
    if (this.options.driver === 'local') {
      this.commandBus.execute(new ImageResizeCommand(file.destination, file.filename)).finally(() => {
        //
      });
      data.filePath = file.path;
      data.originalUrl = file.path;
      data.thumbUrl = `${file.destination}/${thumbName(file.filename)}`;
    } else if (this.options.driver === 's3') {
      //
      data.filePath = (file as Express.MulterS3.File).key;
      data.originalUrl = (file as Express.MulterS3.File).location;
      data.thumbUrl = (file as Express.MulterS3.File).location;
    }

    try {
      const media = await this.mediaService.addMedia(data);
      if (!media.originalUrl?.startsWith('http')) media.originalUrl = `${BASE_URL}/${media.originalUrl}`;
      if (!media.thumbUrl?.startsWith('http')) media.thumbUrl = `${BASE_URL}/${media.thumbUrl}`;
      return media;
    } catch (err: any) {
      throw new ApolloError(err.message);
    }
  }
}
