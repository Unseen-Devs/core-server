import { ArgsType, PickType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/graphql/types/common.args';

@ArgsType()
export class MediaArgs extends PickType(PaginationArgs, ['filters', 'limit', 'page']) {
  parentId?: string;
}
