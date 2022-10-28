import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity, Column, Entity } from 'typeorm';
import { Node } from 'src/graphql/types/common.interface.entity';
import { RewardTypeEnum } from '../enums/reward.enum';

@ObjectType('Reward', {
  description: 'Reward',
  implements: [Node]
})
@Entity({
  name: 'reward'
})
export class RewardEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field(() => ID)
  @Column({nullable: true})
  walletAddress: string;

  @Field({nullable: true, defaultValue: 0})
  rewardAmount: number;

  @Field(() => RewardTypeEnum, {nullable: true})
  rewardType: RewardTypeEnum
}
