import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { RewardEntity } from '../entities/reward.entity';

@EntityRepository(RewardEntity)
export class RewardRepository extends CommonRepository<RewardEntity> {}
