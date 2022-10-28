import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { PlayerResolver } from './resolvers/player.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { PlayerRepository } from './repositories/player.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([PlayerEntity, PlayerRepository])
  ],
  providers: [PlayerResolver, PlayerService]
})
export class PlayerModule {}
