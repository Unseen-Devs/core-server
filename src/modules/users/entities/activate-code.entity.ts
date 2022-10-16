import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, Unique, Index, DeepPartial } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';

export enum ActiveCodeEnum {
  ACTIVATE = 'activate',
  FORGOT = 'forgot',
}

@Entity({
  name: 'activate_codes',
})
@Index(['email', 'code'], { unique: true })
export class ActivateCode extends BaseEntity {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;
  @Column()
  email: string;

  @Column()
  code: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expriedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    default: ActiveCodeEnum.ACTIVATE,
    enum: ActiveCodeEnum,
  })
  type: ActiveCodeEnum;

  constructor(partial: DeepPartial<ActivateCode>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...partial });
  }
}

@ObjectType()
export class ActivateCodeConnection extends PaginationBase(ActivateCode) {}
