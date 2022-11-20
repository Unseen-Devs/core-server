import { Module } from '@nestjs/common';
import { RewardService } from './services/reward.service';
import { RewardResolver } from './resolvers/reward.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardEntity } from './entities/reward.entity';
import { RewardRepository } from './repositories/reward.repository';
import { PlayerService } from '../player/services/player.service';
import { PlayerNftRepository } from '../player-nft/repositories/player-nft.repository';
import { PlayerRepository } from '../player/repositories/player.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { ClubRepository } from '../club/repositories/club.repository';
import { PlayerDataLoader } from '../player/dataloaders/player.dataloader';
import { PlayerNftDataLoader } from '../player-nft/dataloaders/player-nft.dataloader';
import { PlayerNftService } from '../player-nft/services/player-nft.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RewardEntity,
      RewardRepository,
      PlayerNftRepository,
      PlayerRepository,
      UserRepository,
      ClubRepository,
    ]),
  ],
  providers: [RewardResolver, RewardService, PlayerService, PlayerDataLoader, PlayerNftDataLoader, PlayerNftService],
})
export class RewardModule {}
