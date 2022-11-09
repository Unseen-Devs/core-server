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

  @Field(() => EventTypeEnum, { nullable: true })
  @Column({ length: 10 })
  type: EventTypeEnum;

  @Field({ nullable: true })
  @Column({ type: 'int4' })
  touch: number;

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
