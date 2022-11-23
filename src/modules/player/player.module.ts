import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { PlayerResolver } from './resolvers/player.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerRepository } from './repositories/player.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { PlayerDataLoader } from './dataloaders/player.dataloader';
import { ClubDataLoader } from '../club/dataloaders/club.dataloader';
import { ClubRepository } from '../club/repositories/club.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, PlayerRepository, UserRepository, ClubRepository])],
  providers: [PlayerResolver, PlayerService, PlayerDataLoader, ClubDataLoader],
  exports: [PlayerService]
})
export class PlayerModule {}
