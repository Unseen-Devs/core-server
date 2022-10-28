import { Entity, Column, BaseEntity, DeepPartial, JoinTable, ManyToMany } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, HideField, ID, Field } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { User } from 'src/modules/users/entities/users.entity';

@ObjectType('Role', {
  description: 'Role',
  implements: [Node],
})
@Entity({
  name: 'roles',
})
export class Role extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 500, unique: true })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  roles?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToMany(() => User, (user) => user.permissions, {
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: 'users_roles',
  //   joinColumn: {
  //     name: 'roleId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'userId',
  //     referencedColumnName: 'id',
  //   },
  // })
  users: User[];

  constructor(data: DeepPartial<Role>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType()
export class RoleConnection extends PaginationBase(Role) {}
