import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authenticated } from 'src/decorators/common.decorator';
import { MediaEntity } from '../entities/media.entity';
import { MediaService } from '../services/media.service';
import { ID } from '@nestjs/graphql';
import { UpdateMediaInput } from '../dto/update_media.input';

@Resolver(() => MediaEntity)
export class MediaMutationsResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => MediaEntity)
  @Authenticated()
  async removeMedia(@Args({ type: () => ID, name: 'id', nullable: true }) id: string): Promise<MediaEntity> {
    return await this.mediaService.removeMedia(id);
  }

  @Mutation(() => MediaEntity)
  @Authenticated()
  async updateMedia(
    @Args({ type: () => UpdateMediaInput, name: 'input', nullable: false }) input: UpdateMediaInput,
  ): Promise<MediaEntity> {
    return await this.mediaService.updateMedia(input);
  }

  // @Mutation(() => MediaEntity)
  // @Authenticated()
  // async createDir(@Args() data: CreateDirArgs, @CurrentUser() currentUser: User): Promise<MediaEntity> {
  //   return await this.mediaService.addMedia(
  //     {
  //       name: data.dirName,
  //       ownerId: currentUser.id,
  //       type: FileTypeEnum.DIR,
  //     },
  //     data.parentId,
  //   );
  // }
}
