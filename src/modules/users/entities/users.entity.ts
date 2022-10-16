import {
  Entity,
  Column,
  DeepPartial,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { ObjectType, Field, Int, HideField, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { Role } from 'src/modules/permission/entities/role.entity';

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

  @Column({
    default: false,
  })
  isSuperAdmin: boolean;

  @HideField()
  @RelationId((user: User) => user.permissions)
  permissionIds: string[];

  @HideField()
  @ManyToMany(() => Role, (role) => role.users)
  permissions: Role[];

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
