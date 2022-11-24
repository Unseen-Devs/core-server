import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PlayerService } from 'src/modules/player/services/player.service';
import { EventArgs } from '../dtos/event.args';
import { FixturesAndResultsDTO } from '../dtos/event.dto';
import { EventEntity } from '../entities/event.entity';
import { EventService } from '../services/event.services';

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(
    private readonly eventService: EventService, 
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService
    ) {}

  @Mutation(() => [EventEntity], {
    nullable: true,
  })
  async createPastEvents(@Args('input', { type: () => FixturesAndResultsDTO }) input: FixturesAndResultsDTO ) {
    return await this.eventService.createPastEvents(input);
  }

  @Query(() => [EventEntity], {
    nullable: true,
  })
  async getEvents(@Args() args: EventArgs) {
    return await this.eventService.getEvents(args);
  }

  @ResolveField(() => PlayerEntity, {
    nullable: true,
  })
  async player(@Parent() event: EventEntity) {
    const playerId = event.playerId;
    return await this.playerService.findOne(playerId);
  }
}
