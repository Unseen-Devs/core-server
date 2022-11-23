import { Module } from '@nestjs/common';
import { EventService } from './services/event.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRepository } from './repositories/event.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { ClubDataLoader } from '../club/dataloaders/club.dataloader';
import { ClubRepository } from '../club/repositories/club.repository';
import { OptaModule } from '../opta/opta.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventRepository, UserRepository, ClubRepository]), OptaModule],
  providers: [EventService, ClubDataLoader],
  exports: [EventService]
})
export class EventModule {}
