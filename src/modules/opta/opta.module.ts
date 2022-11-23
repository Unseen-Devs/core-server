import { Module } from '@nestjs/common';
import { Opta } from './entities/opta.entity';
import { OptaRepository } from './repositories/opta.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptaResolver } from './resolvers/opta.resolver';
import { OptaService } from './services/opta.service';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Opta, OptaRepository]), PlayerModule],
  providers: [OptaResolver, OptaService],
  exports: [OptaService],
})
export class OptaModule {}
