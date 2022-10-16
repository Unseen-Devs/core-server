import { Entity, Column, BaseEntity, DeepPartial, Index } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';

@ObjectType('Category', {
  description: 'Category',
  implements: [Node],
})
@Entity({
  name: 'categories',
})
export class Category extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 500 })
  @Index()
  title: string;

  @Column({
    default: true,
  })
  isPublished: boolean;

  @Column({
    type: 'int4',
    nullable: false,
    unsigned: true,
  })
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: DeepPartial<Category>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType()
export class CategoryConnection extends PaginationBase(Category) {}
