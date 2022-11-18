import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { EventTypeEnum } from '../enums/event-history.enum';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlayerNftEntity } from 'src/modules/player-nft/entities/player-nft.entity';


@ObjectType('EventHistoryInfo')
export class EventHistoryInfo {
  @Field(() => String)
  eventId: string;

  @Field(() => String)
  typeId: string;

  @Field(() => Int)
  timeMin: number;

  @Field(() => Int)
  timeSec: number;

  @Field(() => Int)
  outcome: number;

  @Field(() => Int)
  assist: number;

  @Field(() => Int)
  touch: number;
}

@ObjectType('EventHistory', {
  description: 'Event History',
  implements: [Node],
})
@Entity({
  name: 'event-history',
})
export class EventHistoryEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  fixtureUuid: string;

  @Field(() => EventHistoryInfo, { nullable: true })
  @Column({ type: 'json' })
  eventInfo: EventHistoryInfo;

  @Field({ nullable: true })
  @Column({ type: 'int' })
  totalTouch: number;

  @Field({ nullable: true })
  @Column({ type: 'bigint' })
  playerNftId: string;

  @Field({ nullable: true })
  @Column({ length: 300 })
  walletAddress: string;

  @Field({ nullable: true })
  @Column({ length: 300 })
  description: string;

  @Field(() => PlayerNftEntity)
  @ManyToOne(() => PlayerNftEntity, (playerNFT) => playerNFT.eventHistory)
  @JoinColumn({ name: 'id' })
  playerNFT: PlayerNftEntity;

  constructor(data: DeepPartial<EventHistoryEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('EventConnection')
export class EventHistoryConnection extends PaginationBase(EventHistoryEntity) {}
