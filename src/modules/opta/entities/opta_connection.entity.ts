import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PageInfo } from 'src/graphql/types/common.interface.entity';
import { Opta } from './opta.entity';

@ObjectType('CategoryEdge', {
  description: 'CategoryEdge',
})
export class OptaEdge {
  node: Opta;
  cursor: string;
}

@ObjectType('OptaConnection', {
  description: 'OptaConnection',
})
export class CategoryConnection {
  edges?: OptaEdge[];

  @Field(() => Int)
  totalCount: number;

  pageInfo: PageInfo;
}
