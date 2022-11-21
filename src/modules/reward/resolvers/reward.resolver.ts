import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RewardService } from '../services/reward.service';
import { RewardEntity } from '../entities/reward.entity';
import { CreateRewardInput } from '../dto/create-reward.input';
import { UpdateRewardInput } from '../dto/update-reward.input';
import { RewardTypeEnum } from '../enums/reward.enum';
import { RewardWalletAddressTypeArgs } from '../dto/reward-walletaddress-type.args';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PlayerNftEntity } from 'src/modules/player-nft/entities/player-nft.entity';
import { PlayerNftService } from 'src/modules/player-nft/services/player-nft.service';
import { PlayerService } from 'src/modules/player/services/player.service';

@Resolver(() => RewardEntity)
export class RewardResolver {
  constructor(
    private readonly rewardService: RewardService,
    private readonly playerNftService: PlayerNftService,
    private readonly playerService: PlayerService,
  ) {}

  @Query(() => [RewardEntity], { name: 'getRewardByWallet' })
  getBywalletAddress(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return this.rewardService.getBywalletAddress(walletAddress);
  }

  @ResolveField(() => PlayerNftEntity, {
    name: 'playerNft',
    nullable: true,
  })
  async playerNft(@Parent() reward: RewardEntity) {
    const { playerNftTokenId } = reward;
    return await this.playerNftService.findOne(playerNftTokenId);    
  }

  @Query(() => RewardEntity, { name: 'getRewardByWalletAndType' })
  getRewardByWalletAndType(@Args() args: RewardWalletAddressTypeArgs) {
    const { walletAddress, rewardType } = args;
    return this.rewardService.getRewardByWalletAndType(walletAddress, rewardType);
  }

  // @Mutation(() => PlayerNftEntity, {
  //   name: 'creatReward',
  //   nullable: true,
  // })
  // async genPlayerNft(
  //   @Args('walletAddress', { type: () => String }) walletAddress: string,
  //   @Args('type', { type: () => PlayerTierEnum }) type: PlayerTierEnum,
  //   @Args('tokenId', { type: () => String }) tokenId: string,
  //   @Args('transactionHash', { type: () => String }) transactionHash: string,
  // ) {
  //   return await this.playerNftService.genPlayerNft(walletAddress, type, tokenId, transactionHash);
  // }
}
