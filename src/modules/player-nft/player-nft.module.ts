import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerNftEntity } from './entities/player-nft.entity';
import { PlayerNftService } from './services/player-nft.service';
import { PlayerNftResolver } from './resolvers/player-nft.resolver';
import { PlayerNftRepository } from './repositories/player-nft.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { PlayerRepository } from '../player/repositories/player.repository';
import { PlayerService } from '../player/services/player.service';
import { PlayerNftDataLoader } from './dataloaders/player-nft.dataloader';
import { PlayerDataLoader } from '../player/dataloaders/player.dataloader';
import { ClubRepository } from '../club/repositories/club.repository';
import { RewardService } from '../reward/services/reward.service';
import { RewardRepository } from '../reward/repositories/reward.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerNftEntity, PlayerNftRepository, PlayerRepository, UserRepository, ClubRepository, RewardRepository]),
  ],
  providers: [PlayerNftService, PlayerService, PlayerNftResolver, PlayerNftDataLoader, PlayerDataLoader, RewardService],
})
export class PlayerNftModule {}
