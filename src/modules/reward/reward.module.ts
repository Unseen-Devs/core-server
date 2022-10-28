import { Module } from '@nestjs/common';
import { RewardService } from './services/reward.service';
import { RewardResolver } from './resolvers/reward.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardEntity } from './entities/reward.entity';
import { RewardRepository } from './repositories/reward.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RewardEntity, RewardRepository])],
  providers: [RewardResolver, RewardService]
})
export class RewardModule {}
