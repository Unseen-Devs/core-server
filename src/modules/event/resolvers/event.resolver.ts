import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FixturesAndResultsArgs } from 'src/modules/opta/dto/opta.args';
import { EventArgs } from '../dtos/event.dto';
import { EventEntity } from '../entities/event.entity';
import { EventService } from '../services/event.services';

@Resolver(() => EventEntity)
export class OptaResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => [EventEntity], {
    nullable: true,
  })
  async createPastEvents(@Args('input') input: FixturesAndResultsArgs) {
    return await this.eventService.createPastEvents(input);
  }

  @Query(() => [EventEntity], {
    nullable: true,
  })
  async getEvents(@Args('input') args: EventArgs) {
    return await this.eventService.getEvents(args);
  }
}
