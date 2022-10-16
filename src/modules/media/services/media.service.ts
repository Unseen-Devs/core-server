import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories/media.repository';
import { MediaEntity } from '../entities/media.entity';
import { DeepPartial } from 'typeorm';
import { MediaArgs } from '../dto/media.args';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  addMedia(data: DeepPartial<MediaEntity>) {
    const media = this.mediaRepository.create(data);
    // if (parentId) {
    //   const parent = await this.mediaRepository.findOne(parentId);
    //   media.parent = parent;
    // }
    return this.mediaRepository.save(media);
  }

  removeMedia = async (id: string) => {
    const media = await this.mediaRepository.findOneOrFail({
      where: {
        id,
        isDeleted: false,
      },
    });
    media.isDeleted = true;
    return this.mediaRepository.save(media);
  };

  updateMedia = async (data: { id: string; name: string }) => {
    await this.mediaRepository.update(data.id, { name: data.name });
    return this.mediaRepository.findOneOrFail({ where: { id: data.id } });
  };

  async pagination({ page, limit, filters }: MediaArgs) {
    return this.mediaRepository.paginate(
      {
        page,
        limit,
        filters,
      },
      {
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }
}
