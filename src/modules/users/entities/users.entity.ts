import {
  Entity,
  Column,
  DeepPartial,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
// import { PlayerEntity } from 'src/modules/player/entities/player.entity';

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

  @Field({ nullable: true })
  @Column()
  walletAddress: string;

  @Field({ nullable: true })
  @Column('bigint', {
    unsigned: true,
  }) 
  nonce: string ;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: DeepPartial<User>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...partial });
  }
}

@ObjectType()
export class UserConnection extends PaginationBase(User) {}
