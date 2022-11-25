import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PlayerNftEntity } from 'src/modules/player-nft/entities/player-nft.entity';
import { PlayerNftService } from 'src/modules/player-nft/services/player-nft.service';
import { PlayerService } from 'src/modules/player/services/player.service';
import { RewardWalletAddressTypeArgs } from '../dto/reward-walletaddress-type.args';
import { CreateRewardInput, UpdateRewardInput } from '../dto/reward.input';
import { RewardEntity } from '../entities/reward.entity';
import { RewardService } from '../services/reward.service';

@Resolver(() => RewardEntity)
export class RewardResolver {
  constructor(
    private readonly rewardService: RewardService,
    private readonly playerNftService: PlayerNftService,
    private readonly playerService: PlayerService,
  ) {}

  @Query(() => [RewardEntity], { name: 'getRewardsByWallet' })
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

  @Query(() => RewardEntity, { name: 'getReward' })
  getDetailReward(@Args('id', { type: () => String }) id: string) {
    return this.rewardService.getDetailReward(id);
  }
  

  @Mutation(() => RewardEntity)
  async createReward(@Args('input') input: CreateRewardInput): Promise<RewardEntity> {
    const entity = await this.rewardService.create(input);
    return entity;
  }

  @Mutation(() => RewardEntity)
  async updateReward(
      @Args('input') input: UpdateRewardInput,
  ): Promise<RewardEntity> {
    const {id, ...data} = input;
    return this.rewardService.update(id, data);
  }
}
