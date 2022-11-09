import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { EventRepository } from '../repositories/event.repository';
import { EventEntity } from '../entities/event.entity';
import { getConnection } from 'typeorm';
import { UserRepository } from '../../users/repositories/users.repository';

@Injectable()
export class EventService {
  constructor(private readonly userRepository: UserRepository, private readonly eventRepository: EventRepository) {}
}
