import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { EventHistoryRepository } from '../repositories/event-history.repository';
import { EventHistoryEntity } from '../entities/event-history.entity';
import { getConnection } from 'typeorm';
import { UserRepository } from '../../users/repositories/users.repository';

@Injectable()
export class EventHistoryService {
  constructor(private readonly userRepository: UserRepository, private readonly eventHistoryRepository: EventHistoryRepository) {}
}
