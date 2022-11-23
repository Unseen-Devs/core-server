import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
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
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlayerTierEnum } from '../enums/player.enum';
import { PlayerNftEntity } from '../../player-nft/entities/player-nft.entity';
import { ClubEntity } from '../../club/entities/club.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';

@ObjectType('Player', {
  description: 'Player',
  implements: [Node],
})
@Entity({
  name: 'player',
})
export class PlayerEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  playerId: string;

  // @Field({ nullable: true })
  // @Column('bigint', {
  //   unsigned: true,
  //   nullable: true,
  // })
  // clubId: number;

  @Field({ nullable: true })
  @Column({ length: 100 })
  contestantId: string;

  @Field({ nullable: true })
  @Column({ length: 200 })
  firstName: string;

  @Field({ nullable: true })
  @Column({ length: 200 })
  lastName: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  shortFirstName: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  shortLastName: string;

  @Field({ nullable: true })
  @Column({ length: 500 })
  shirtPlayer: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  matchName: string;

  @Field(() => PlayerTierEnum, { nullable: true })
  @Column()
  type: PlayerTierEnum;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: false,
  })
  shirtNumber: number;

  @Field({ nullable: true })
  @Column({ length: 100 })
  position: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  positionSide: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  formationPlace: string;

  @Field({ nullable: true, defaultValue: 0 })
  touch: number;

  @Field({ nullable: true })
  @Column({ length: 100 })
  optaId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => ClubEntity)
  @ManyToOne(() => ClubEntity, (club) => club.players)
  @JoinColumn({ name: 'clubId' })
  club: ClubEntity;

  @Field(() => [EventEntity])
  @OneToMany(() => EventEntity, (event) => event.player)
  @JoinColumn({ name: 'playerId' })
  events: EventEntity[];

  constructor(data: DeepPartial<PlayerEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('PlayerConnection')
export class PlayerConnection extends PaginationBase(PlayerEntity) {}
