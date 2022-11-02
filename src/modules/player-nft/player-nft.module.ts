import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerNftEntity } from './entities/player-nft.entity';
import { PlayerNftService } from './services/player-nft.service';
import { PlayerNftResolver } from './resolvers/player-nft.resolver';
import { PlayerNftRepository } from './repositories/player-nft.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([PlayerNftEntity, PlayerNftRepository])
  ],
  providers: [PlayerNftService, PlayerNftResolver]
})
export class PlayerNftModule {}
