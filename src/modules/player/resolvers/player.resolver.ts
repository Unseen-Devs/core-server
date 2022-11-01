import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayerService } from '../services/player.service';
import { PlayerEntity, PlayerConnection } from '../entities/player.entity';
import { CreatePlayerInput } from '../dto/create-player.input';
import { UpdatePlayerInput } from '../dto/update-player.input';
import { PlayerArgs } from '../dto/player.args';

@Resolver(() => PlayerEntity)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query(() => PlayerConnection, {
    nullable: true,
    name: 'getPlayers',
  })
  async getPlayersByWallet(@Args() args: PlayerArgs) {
    return await this.playerService.pagination(args);
  }

  @Query(() => PlayerEntity, { name: 'getPlayer', nullable: true })
  async getPlayer(@Args('id', { type: () => String }) id: string) {
    return await this.playerService.findOne(id);
  }

  @Query(() => PlayerEntity, {
    name: 'getPlayerByWallet',
    nullable: true
  })
  async getPlayerByWallet(
    @Args('walletAddress', {type: () => String}) walletAddress: string,
    @Args('id', { type: () => String }) id: string
  ) {
    return await this.playerService.findOneByWallet(walletAddress, id);
  }


  @Query(() => [PlayerEntity], {
    name: 'getPlayersByWallet',
    nullable: true
  })
  async findByWallet(
    @Args('walletAddress', {type: () => String}) walletAddress: string
  ) {
    return await this.playerService.findByWallet(walletAddress);
  }

  @Query(() => [PlayerEntity], {
    name: 'generatePlayer',
    nullable: true
  })
  async generatePlayer() {
    return this.playerService.generatePlayer();
  }
}
