import { Injectable } from '@nestjs/common';
import { FixturesAndResultsArgs } from 'src/modules/opta/dto/opta.args';
import { OptaService } from 'src/modules/opta/services/opta.service';
import { EventRepository } from '../repositories/event.repository';
import { ApolloError } from 'apollo-server'
import { EventArgs } from '../dtos/event.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly optaService: OptaService
    ) {}

  async createPastEvents(input: FixturesAndResultsArgs){
    try {
      const getPastEvents = await this.optaService.getPastMatchesEvents(input);
      return await this.eventRepository.createEvents(getPastEvents);
    } catch (error) {
      throw new ApolloError('Create Event Failed', 'create_events_failed');
    }
  }

  async getEvents(args: EventArgs){
    return await this.eventRepository.getEvents(args);
  }
}
