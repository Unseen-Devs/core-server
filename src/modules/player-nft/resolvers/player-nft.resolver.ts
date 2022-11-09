import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PlayerNftEntity } from '../entities/player-nft.entity';
import { PlayerNftService } from '../services/player-nft.service';
import { PlayerTierEnum } from '../../player/enums/player.enum';
import { PlayerEntity } from '../../player/entities/player.entity';
import { PlayerDataLoader } from 'src/modules/player/dataloaders/player.dataloader';
import { PlayerService } from 'src/modules/player/services/player.service';

@Resolver(() => PlayerNftEntity)
export class PlayerNftResolver {
  constructor(
    private readonly playerDataLoader: PlayerDataLoader,
    private readonly playerNftService: PlayerNftService,
    private readonly playerService: PlayerService,
  ) {}

  @Query(() => [PlayerNftEntity], {
    name: 'getPlayerNftsByWallet',
    nullable: true,
  })
  async getPlayerNftsByWallet(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return await this.playerNftService.findByWallet(walletAddress);
  }

  @Mutation(() => PlayerNftEntity, {
    name: 'genPlayerNft',
    nullable: true,
  })
  async genPlayerNft(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
    @Args('type', { type: () => PlayerTierEnum }) type: PlayerTierEnum,
    @Args('tokenId', { type: () => String }) tokenId: string,
  ) {
    return await this.playerNftService.genPlayerNft(walletAddress, type, tokenId);
  }

  @ResolveField(() => PlayerEntity, {
    name: 'player',
    nullable: true,
  })
  async player(@Parent() playerNft: PlayerNftEntity) {
    const { playerId } = playerNft;
    return await this.playerService.findOne(playerId);
    // return this.playerDataLoader.load(playerId);
  }
}
