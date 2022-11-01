import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerNftEntity } from './entities/player-nft.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([PlayerNftEntity])
  ],
  providers: []
})
export class PlayerNftModule {}
