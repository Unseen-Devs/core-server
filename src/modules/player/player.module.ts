import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { PlayerResolver } from './resolvers/player.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerRepository } from './repositories/player.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { PlayerDataLoader } from './dataloaders/player.dataloader';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, PlayerRepository, UserRepository])],
  providers: [PlayerResolver, PlayerService, PlayerDataLoader],
})
export class PlayerModule {}
