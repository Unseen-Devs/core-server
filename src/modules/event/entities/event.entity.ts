import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

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
  fixtureId: string;

  @Field(() => ID, {nullable: true})
  @Column('bigint', {nullable: true})
  playerId: string;

  @Field({nullable: true})
  @Column({nullable: true})
  playerOptaId: string;

  @Field({ nullable: true })
  @Column({ type: 'int', nullable: true })
  gameweek: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time: string;

  @Field({ nullable: true })
  @Column({ type: 'int', default: 0 })
  totalTouch: number;

  @Field({ defaultValue: [] })
  @Column("simple-array", { nullable: true })
  scorerTouches: number[];

  @Field({ defaultValue: []  })
  @Column("simple-array", { nullable: true })
  assistTouches: number[];

  @Field({ nullable: true })
  @Column({ length: 300, nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @Field(() => PlayerEntity, { nullable: true})
  // @ManyToOne(() => PlayerEntity, (player) => player.events)
  // @JoinColumn({ name: 'playerId' })
  // player: PlayerEntity;

  constructor(data: DeepPartial<EventEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('EventConnection')
export class EventConnection extends PaginationBase(EventEntity) {}
