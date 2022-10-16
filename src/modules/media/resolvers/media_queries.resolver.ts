import { Args, Query, Resolver } from '@nestjs/graphql';
import { MediaArgs } from '../dto/media.args';
import { MediaEntity } from '../entities/media.entity';
import { MediaService } from '../services/media.service';
import { MediaConnection } from '../entities/media.entity';
import { Allow } from 'src/decorators/common.decorator';

@Resolver(() => MediaEntity)
export class MediaQueriesResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => MediaConnection, {
    nullable: true,
    name: 'medias',
    description: 'Require Authenticated',
  })
  @Allow()
  async medias(@Args() args: MediaArgs) {
    return this.mediaService.pagination(args);
  }
}
