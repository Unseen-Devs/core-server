import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassSeasonEntity } from './entities/pass-season.entity';
import { PassSeasonService } from './services/pass-season.service';
import { PassSeasonResolver } from './resolvers/pass-season.resolver';
import { PassSeasonRepository } from './repositories/pass-season.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { PassSeasonDataLoader } from './dataloaders/pass-season.dataloader';

@Module({
  imports: [TypeOrmModule.forFeature([PassSeasonEntity, PassSeasonRepository, UserRepository])],
  providers: [PassSeasonService, PassSeasonResolver, PassSeasonDataLoader],
})
export class PassSeasonModule {}
