import { ArgsType, Field, PickType } from '@nestjs/graphql';
import { RewardTypeEnum } from '../enums/reward.enum';

@ArgsType()
export class RewardWalletAddressTypeArgs {
  @Field(() => String)
  walletAddress: string;

  @Field(() => RewardTypeEnum)
  rewardType?: RewardTypeEnum;
}
