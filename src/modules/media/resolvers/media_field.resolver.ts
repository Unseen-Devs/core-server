import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';
import { MediaEntity } from '../entities/media.entity';

@Resolver(() => MediaEntity)
export class MediaFieldResolver {
  constructor(private readonly userDataLoader: UserDataLoader) {}

  @ResolveField(() => String, {
    nullable: true,
  })
  filePath(@Parent() media: MediaEntity) {
    if (media.type === 'dir') return '';
    return media.filePath?.startsWith('http')
      ? media.filePath
      : `${process.env.BASE_URL ?? ''}/${media.filePath ?? ''}`;
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  thumbUrl(@Parent() media: MediaEntity) {
    if (media.type === 'dir') return '';
    return media.thumbUrl?.startsWith('http')
      ? media.thumbUrl
      : `${process.env.BASE_URL ?? ''}/${media.thumbUrl ?? ''}`;
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  originalUrl(@Parent() media: MediaEntity) {
    if (media.type === 'dir') return '';
    return media.originalUrl?.startsWith('http')
      ? media.originalUrl
      : `${process.env.BASE_URL ?? ''}/${media.originalUrl ?? ''}`;
  }

  @ResolveField(() => User, {
    nullable: true,
  })
  owner(@Parent() media: MediaEntity) {
    if (media.ownerId) return this.userDataLoader.load(media.ownerId);
    return null;
  }
}
