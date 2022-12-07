import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PassSeasonEntity } from '../entities/pass-season.entity';
import { PassSeasonService } from '../services/pass-season.service';
import { PassSeasonEnum } from '../enums/pass-season.enum';
import { PlayerEntity } from '../../player/entities/player.entity';
import { PlayerService } from 'src/modules/player/services/player.service';
import { SinatureResponse } from 'src/modules/common/common.entity';
import { UpdatePassInput } from '../dto/pass.input';

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

  @Query(() => PassSeasonEntity, {
    name: 'detailPassSeason',
    nullable: true,
  })
  async getDetailPassSeason(@Args('id', { type: () => String }) id: string) {
    return await this.passSeasonService.findOne(id);
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

  @Mutation(() => SinatureResponse, {
    name: 'generateSeasonPassStoreSignature',
    nullable: true,
  })
  async generateSeasonPassStoreSignature(@Args('walletAddress', { type: () => String }) walletAddress: string,) {
    return await this.passSeasonService.generateSeasonPassStoreSignature(walletAddress);
  }

  @Mutation(() => SinatureResponse, {
    name: 'generateOpenAkshunSignature',
    nullable: true,
  })
  async generateOpenAkshunSignature(@Args('passId', { type: () => Number }) passId: number,) {
    return await this.passSeasonService.generateOpenAkshunSignature(passId);
  }

  @Mutation(() => PassSeasonEntity)
  async updatePassSeason(
      @Args('input') input: UpdatePassInput,
  ): Promise<PassSeasonEntity> {
    const {id, ...data} = input;
    return this.passSeasonService.update(id, data);
  }
}
