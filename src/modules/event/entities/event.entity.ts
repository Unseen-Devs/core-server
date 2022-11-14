import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { EventTypeEnum } from '../enums/event.enum';
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
import { PlayerEntity } from 'src/modules/player/entities/player.entity';

@ObjectType('EventInfo')
export class EventInfo {
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

@ObjectType('Event', {
  description: 'Event',
  implements: [Node],
})
@Entity({
  name: 'event',
})
export class EventEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  fixtureUuid: string;

  @Field(() => EventInfo, { nullable: true })
  @Column({ type: 'json' })
  eventInfo: EventInfo;

  @Field({ nullable: true })
  @Column({ type: 'int' })
  totalTouch: number;

  @Field({ nullable: true })
  @Column({ length: 300 })
  description: string;

  @Field(() => PlayerEntity)
  @ManyToOne(() => PlayerEntity, (player) => player.events)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;

  constructor(data: DeepPartial<EventEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('EventConnection')
export class EventConnection extends PaginationBase(EventEntity) {}
