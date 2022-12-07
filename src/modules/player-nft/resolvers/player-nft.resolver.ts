import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PlayerNftEntity } from '../entities/player-nft.entity';
import { PlayerNftService } from '../services/player-nft.service';
import { PlayerTierEnum } from '../../player/enums/player.enum';
import { PlayerEntity } from '../../player/entities/player.entity';
import { PlayerService } from 'src/modules/player/services/player.service';
import { SinatureResponse } from 'src/modules/common/common.entity';

@Resolver(() => PlayerNftEntity)
export class PlayerNftResolver {
  constructor(
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

  @Query(() => PlayerNftEntity, {
    name: 'getPlayerNft',
    nullable: true,
  })
  async getPlayerNft(@Args('id', { type: () => String }) id: string) {
    return await this.playerNftService.findById(id);
  }

  @Mutation(() => PlayerNftEntity, {
    name: 'genPlayerNft',
    nullable: true,
  })
  async genPlayerNft(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
    @Args('type', { type: () => PlayerTierEnum }) type: PlayerTierEnum,
    @Args('tokenId', { type: () => String }) tokenId: string,
    @Args('passTokenId', { type: () => String }) passTokenId: string,
    @Args('transactionHash', { type: () => String }) transactionHash: string,
  ) {
    return await this.playerNftService.genPlayerNft(walletAddress, type, tokenId, transactionHash, passTokenId);
  }

  @ResolveField(() => PlayerEntity, {
    name: 'player',
    nullable: true,
  })
  async player(@Parent() playerNft: PlayerNftEntity) {
    const { playerId } = playerNft;
    return await this.playerService.findOne(playerId);
  }

  @Mutation(() => SinatureResponse, {
    name: 'generateAkshunStoreSignature',
    nullable: true,
  })
  async generateAkshunStoreSignature(@Args('walletAddress', { type: () => String }) walletAddress: string,) {
    return await this.playerNftService.generateAkshunStoreSignature(walletAddress);
  }
}
