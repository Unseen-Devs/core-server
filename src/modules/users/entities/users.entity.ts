import {
  Entity,
  Column,
  DeepPartial,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PlayerNftEntity } from '../../player_nft/entities/player-nft.entity';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'users',
})
export class User extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({nullable: true})
  @Column()
  walletAddress: string;

  @Field({nullable: true})
  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

@OneToMany(() => PlayerNftEntity, player => player.user)
players: PlayerNftEntity[];
  // @ManyToMany(() => PlayerEntity, (player) => player.users)
  // players: PlayerEntity[];

  constructor(partial: DeepPartial<User>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...partial });
  }
}

@ObjectType()
export class UserConnection extends PaginationBase(User) {}
