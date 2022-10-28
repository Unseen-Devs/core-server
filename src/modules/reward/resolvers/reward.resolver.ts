import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RewardService } from '../services/reward.service';
import { RewardEntity } from '../entities/reward.entity';
import { CreateRewardInput } from '../dto/create-reward.input';
import { UpdateRewardInput } from '../dto/update-reward.input';
import { RewardTypeEnum } from '../enums/reward.enum';
import { RewardWalletAddressTypeArgs } from '../dto/reward-walletaddress-type.args';

@Resolver(() => RewardEntity)
export class RewardResolver {
  constructor(private readonly rewardService: RewardService) {}

  @Query(() => [RewardEntity], { name: 'getRewardByWalledAndType' })
  getBywalletAddress(
    @Args('walletAddress', { type: () => String }) walletAddress: string
  ) {
    return this.rewardService.getBywalletAddress(walletAddress);
  }

  @Query(() => RewardEntity, { name: 'getRewardByWalledAndType' })
  getRewardByWalledAndType(
    @Args() args: RewardWalletAddressTypeArgs
  ) {
    const {walletAddress, rewardType} = args;
    return this.rewardService.getRewardByWalledAndType(walletAddress, rewardType);
  }
}
