import { Entity, Column, DeepPartial, CreateDateColumn, UpdateDateColumn, Index, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, HideField, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'members',
})
export class Member extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 100, unique: true })
  @Index({
    unique: true,
  })
  email: string;

  @HideField()
  @Column()
  password: string;

  @HideField()
  @Column()
  passwordSalt: string;

  @Field({
    nullable: true,
  })
  @Column({ nullable: true })
  @Index({ fulltext: true })
  firstName: string;

  @Column({ nullable: true })
  @Index({ fulltext: true })
  lastName?: string;

  @Column({
    default: 'local',
  })
  provider: string;

  @Column({ nullable: true })
  providerId?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Field(() => Int)
  @Column('int', { nullable: true })
  age?: number;

  @Column({
    default: false,
  })
  @Index()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: DeepPartial<Member>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...partial });
  }
}

@ObjectType()
export class MemberConnection extends PaginationBase(Member) {}
