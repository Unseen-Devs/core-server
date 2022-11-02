import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { User } from 'src/modules/users/entities/users.entity';
import { BaseEntity, Column, CreateDateColumn, DeepPartial, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { PlayerEntity } from '../../player/entities/player.entity';

@ObjectType('PlayerNft', {
  description: 'PlayerNft',
  implements: [Node]
})
@Entity({
  name: 'player_nft'
})
export class PlayerNftEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({nullable: true})
  @Column()
  tokenId: string;

  @Field({nullable: true})
  @Column()
  rewardCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field({nullable: true})
  @Column()
  walletAddress: string;

  @Field({nullable: true})
  @Column()
  playerId: string;

  constructor(data: DeepPartial<PlayerNftEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
  }

  @ObjectType('PlayerConnection')
export class PlayerConnection extends PaginationBase(PlayerNftEntity) {}