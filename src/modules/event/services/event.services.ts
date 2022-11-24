import { Injectable } from '@nestjs/common';
import { FixturesAndResultsArgs } from 'src/modules/opta/dto/opta.args';
import { OptaService } from 'src/modules/opta/services/opta.service';
import { EventRepository } from '../repositories/event.repository';
import { ApolloError } from 'apollo-server'
import { EventArgs } from '../dtos/event.args';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly optaService: OptaService
    ) {}

  async createPastEvents(input: FixturesAndResultsArgs){
    try {
      const getPastEvents = await this.optaService.getPastMatchesEvents(input);
      const newEvents = await this.eventRepository.createEvents(getPastEvents);
      console.log(newEvents);
      return await this.eventRepository.save(newEvents);
    } catch (error) {
      throw new ApolloError('Create Event Failed', 'create_events_failed');
    }
  }

  async getEvents(args: EventArgs){
    return await this.eventRepository.getEvents(args);
  }
}
