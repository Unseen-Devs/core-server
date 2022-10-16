import { Column, Entity, BaseEntity, DeepPartial, Index } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { FileTypeEnum } from 'src/graphql/enums/file_type';
import { snowflake } from 'src/helpers/common';

@ObjectType('Media', {
  implements: [Node],
})
@Entity({
  name: 'medias',
})
export class MediaEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 500 })
  @Index()
  name: string;

  @Column({ length: 500, nullable: true })
  filePath?: string;

  @Column({ length: 500, nullable: true })
  originalUrl?: string;

  @Column({ length: 500, nullable: true })
  thumbUrl?: string;

  @Column({ length: 100, nullable: true })
  mimeType?: string;

  @Field(() => Int)
  @Column({ type: 'int4', unsigned: true, nullable: true })
  fileSize?: number;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  ownerId?: string;

  @Column({
    type: 'enum',
    default: FileTypeEnum.FILE,
    enum: FileTypeEnum,
  })
  type: FileTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  constructor(data: DeepPartial<MediaEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('MediaConnection')
export class MediaConnection extends PaginationBase(MediaEntity) {}
