import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Node } from 'src/graphql/types/common.interface.entity';
import { RewardTypeEnum } from '../enums/reward.enum';
import { User } from 'src/modules/users/entities/users.entity';
import { PlayerNftEntity } from '../../player-nft/entities/player-nft.entity';

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

  @Field({nullable: true, defaultValue: 0})
  rewardAmount: number;

  @Field(() => RewardTypeEnum, {nullable: true})
  rewardType: RewardTypeEnum

    
  @ManyToOne(() => User)
  @JoinColumn({name: 'walletAddress'})
  walletAddress: string;

  @ManyToOne(() => PlayerNftEntity)
  @JoinColumn({ name: 'tokenId' })
  tokenId: string;
}
