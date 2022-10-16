import { Entity, Column, BaseEntity, DeepPartial, Index } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';

@ObjectType('Blog')
@Entity({
  name: 'blogs',
})
export class BlogEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 500, comment: 'Title of blog' })
  @Index()
  title: string;

  @Column('text', {
    comment: 'Content of blog',
  })
  content: string;

  @Field(() => Int)
  @Column('int', {
    default: 0,
    comment: 'Total view by client',
  })
  views: number;

  @Column({
    default: true,
    comment: 'Set published',
  })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: DeepPartial<BlogEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}
