import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';
import { BaseEntity, Column, CreateDateColumn, DeepPartial, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { PassStatusEnum } from '../enums/pass-season.enum';

@ObjectType('PassSeason', {
  description: 'PassSeason',
  implements: [Node],
})
@Entity({
  name: 'pass_season',
})
export class PassSeasonEntity extends BaseEntity implements Node {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field({ nullable: true })
  @Column()
  tokenId: string;

  @Field({ nullable: true })
  @Column()
  tier: string;

  @Field({ nullable: true })
  @Column()
  transactionHash: string;

  @Field({ nullable: true })
  @Column()
  seasonNumber: number;

  @Field({ nullable: true, defaultValue: PassStatusEnum.IN_PROGRESS })
  @Column()
  status: PassStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column()
  walletAddress: string;

  constructor(data: DeepPartial<PassSeasonEntity>) {
    super();
    Object.assign(this, { id: snowflake.nextId(), ...data });
  }
}

@ObjectType('PlayerConnection')
export class PlayerConnection extends PaginationBase(PassSeasonEntity) {}
