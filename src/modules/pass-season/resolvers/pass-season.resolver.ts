import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PassSeasonEntity } from '../entities/pass-season.entity';
import { PassSeasonService } from '../services/pass-season.service';
import { PassSeasonEnum } from '../enums/pass-season.enum';
import { PlayerEntity } from '../../player/entities/player.entity';
import { PlayerService } from 'src/modules/player/services/player.service';
import { SinatureResponse } from 'src/modules/common/common.entity';

@Resolver(() => PassSeasonEntity)
export class PassSeasonResolver {
  constructor(
    private readonly passSeasonService: PassSeasonService,
  ) {}

  @Query(() => [PassSeasonEntity], {
    name: 'getPassSeason',
    nullable: true,
  })
  async getPlayerNftsByWallet(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return await this.passSeasonService.findByWallet(walletAddress);
  }

  @Mutation(() => PassSeasonEntity, {
    name: 'genPassNft',
    nullable: true,
  })
  async genPassNft(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
    @Args('type', { type: () => PassSeasonEnum }) tier: PassSeasonEnum,
    @Args('tokenId', { type: () => String }) tokenId: string,
    @Args('seasonNumber', { type: () => Number }) seasonNumber: number,
    @Args('transactionHash', { type: () => String }) transactionHash: string,
  ) {
    return await this.passSeasonService.genPassNft(walletAddress, tier, tokenId, transactionHash, seasonNumber);
  }

}
