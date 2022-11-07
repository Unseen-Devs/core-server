import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { User } from 'src/modules/users/entities/users.entity';
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
  JoinColumn,
} from 'typeorm';

@ObjectType('Club', {
  description: 'Club',
  implements: [Node],
})
@Entity({
  name: 'club',
})
export class ClubEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field(() => String)
  @Column({ nullable: true })
  code: string;

  @Field(() => String)
  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [PlayerEntity])
  @OneToMany(() => PlayerEntity, (player) => player.club)
  @JoinColumn({ name: 'clubId' })
  players: PlayerEntity[];

  constructor(data: DeepPartial<ClubEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('ClubConnection')
export class ClubConnection extends PaginationBase(ClubEntity) {}
