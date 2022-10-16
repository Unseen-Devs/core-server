import { Inject, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { MEDIA_OPTIONS } from '../constants';
import { thumbName } from '../helpers';
import { MediaOptions } from '../media.interface';

@Injectable()
export class SharpService {
  constructor(@Inject(MEDIA_OPTIONS) private mediaOptions: MediaOptions) {
    //
  }
  resize(imgPath: string, fileName: string, option?: { thumbSize: number; quality: number }) {
    if (this.mediaOptions.driver !== 'local') {
      return;
    }
    const thumbSize = option?.thumbSize ?? this.mediaOptions.thumbSize ?? 200;
    const quality = option?.quality ?? this.mediaOptions.quality ?? 70;
    const image = sharp(`${imgPath}/${fileName}`);
    return Promise.all([
      image
        .clone()
        .resize({
          width: thumbSize,
          height: thumbSize,
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
        })
        .jpeg({
          quality: quality,
        })
        .png({
          quality: quality,
        })
        .toFile(`${imgPath}/${thumbName(fileName)}`),
    ]);
  }
}
