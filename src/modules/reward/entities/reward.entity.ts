import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Node } from 'src/graphql/types/common.interface.entity';
import { RewardTypeEnum, RewardStatusEnum } from '../enums/reward.enum';
import { User } from 'src/modules/users/entities/users.entity';
import { PlayerNftEntity } from '../../player-nft/entities/player-nft.entity';
import { float } from '@elastic/elasticsearch/lib/api/types';
import { snowflake } from 'src/helpers/common';

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
  @Column('float')
  rewardAmount: number;

  @Field(() => RewardTypeEnum, {nullable: true})
  rewardType: RewardTypeEnum;

  @Field({nullable: true})
  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => RewardStatusEnum, {nullable: true})
  @Column()
  status: RewardStatusEnum;

  @Field({nullable: true})
  @Column()
  walletAddress: string;

  // @ManyToOne(() => PlayerNftEntity)
  // @JoinColumn({ name: 'playerNftTokenId' })
  // playerNftTokenId: string;

  @Field({nullable: true})
  @Column()
  playerNftTokenId: string;

  constructor(data: DeepPartial<RewardEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
}
}
