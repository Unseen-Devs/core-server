import { InputType, Int, Field, ID, Float, PartialType } from '@nestjs/graphql';
import { RewardStatusEnum, RewardTypeEnum } from '../enums/reward.enum';

@InputType()
export class CreateRewardInput {
  @Field(() => Float)
  rewardAmount: number;

  @Field(() => RewardTypeEnum, {nullable: true})
  rewardType: RewardTypeEnum;

  @Field({nullable: true})
  transactionId: string;

  @Field({nullable: true})
  playerNftTokenId: string;

  @Field(() => RewardStatusEnum, {nullable: true, defaultValue: RewardStatusEnum.IN_PROGRESS})
  status?: RewardStatusEnum;

  @Field({nullable: true})
  walletAddress: string;
}

@InputType()
export class UpdateRewardInput extends PartialType(CreateRewardInput){
  @Field(() => ID)
  id: string;
}
