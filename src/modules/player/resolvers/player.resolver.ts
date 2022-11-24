import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { PlayerService } from '../services/player.service';
import { PlayerEntity, PlayerConnection } from '../entities/player.entity';
import { PlayerArgs } from '../dto/player.args';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import { EventService } from 'src/modules/event/services/event.services';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver(() => PlayerEntity)
export class PlayerResolver {
  constructor(
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService
    ) {}

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
    nullable: true,
  })
  async getPlayerByWallet(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.playerService.findOneByWallet(walletAddress, id);
  }

  @Query(() => [PlayerEntity], {
    name: 'getPlayersByWallet',
    nullable: true,
  })
  async findByWallet(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return await this.playerService.findByWallet(walletAddress);
  }

  @ResolveField(() => [EventEntity], {
    nullable: true,
  })
  async events(@Parent() player: PlayerEntity) {    
    const playerId = player.id;
    return await this.eventService.getEvents({playerId});
  }
}
