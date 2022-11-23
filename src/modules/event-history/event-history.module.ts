import { Module } from '@nestjs/common';
import { EventHistoryService } from './services/event-history.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHistoryEntity } from './entities/event-history.entity';
import { EventHistoryRepository } from './repositories/event-history.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { ClubDataLoader } from '../club/dataloaders/club.dataloader';
import { ClubRepository } from '../club/repositories/club.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventHistoryEntity, EventHistoryRepository, UserRepository, ClubRepository])],
  providers: [EventHistoryService, ClubDataLoader],
})
export class EventHistoryModule {}