import { Module } from '@nestjs/common';
import { Opta } from './entities/opta.entity';
import { OptaRepository } from './repositories/opta.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OptaDataLoader } from './dataloaders/opta.dataloader';
import { OptaResolver } from './resolvers/opta.resolver';
import { OptaService } from './services/opta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Opta, OptaRepository])],
  providers: [OptaResolver, OptaService],
  exports: [],
})
export class OptaModule {}
