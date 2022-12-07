import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { EventHistoryEntity } from 'src/modules/event-history/entities/event-history.entity';
import { BaseEntity, Column, CreateDateColumn, DeepPartial, Entity, OneToMany, UpdateDateColumn } from "typeorm";

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
  passTokenId: string;

  @Field({nullable: true})
  @Column()
  rewardCode: number;

  @Field({nullable: true})
  @Column()
  transactionHash: string;

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

  @Field(() => [EventHistoryEntity])
  @OneToMany(() => EventHistoryEntity, (eventHistory) => eventHistory.playerNFT)
  eventHistory: EventHistoryEntity[];

  constructor(data: DeepPartial<PlayerNftEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
  }

  @ObjectType('PlayerConnection')
export class PlayerConnection extends PaginationBase(PlayerNftEntity) {}