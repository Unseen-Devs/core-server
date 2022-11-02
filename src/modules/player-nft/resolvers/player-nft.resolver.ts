import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayerNftEntity } from '../entities/player-nft.entity';
import { PlayerNftService } from '../services/player-nft.service';
import { PlayerTierEnum } from '../../player/enums/player.enum';

@Resolver(() => PlayerNftEntity)
export class PlayerNftResolver {
  constructor(private readonly playerNftService: PlayerNftService) {}


  @Query(() => [PlayerNftEntity], {
    name: 'getPlayerNftsByWallet',
    nullable: true
  })
  async getPlayerNftsByWallet(
    @Args('walletAddress', {type: () => String}) walletAddress: string
  ) {
    return await this.playerNftService.findByWallet(walletAddress);
  }

  @Mutation(() => PlayerNftEntity, {
    name: 'genPlayerNft',
    nullable: true
  })
  async genPlayerNft(
    @Args('walletAddress', {type: () => String}) walletAddress: string,
    @Args('type', {type: () => PlayerTierEnum}) type: PlayerTierEnum
  ) {
    return await this.playerNftService.genPlayerNft(walletAddress, type);
  }
}
