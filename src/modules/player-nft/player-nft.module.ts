import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerNftEntity } from './entities/player-nft.entity';
import { PlayerNftService } from './services/player-nft.service';
import { PlayerNftResolver } from './resolvers/player-nft.resolver';
import { PlayerNftRepository } from './repositories/player-nft.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { PlayerRepository } from '../player/repositories/player.repository';
import { PlayerService } from '../player/services/player.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([PlayerNftEntity, PlayerNftRepository, PlayerRepository, UserRepository])
  ],
  providers: [PlayerNftService, PlayerService, PlayerNftResolver]
})
export class PlayerNftModule {}
