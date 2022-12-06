import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { PassSeasonEntity } from '../entities/pass-season.entity';

@EntityRepository(PassSeasonEntity)
export class PassSeasonRepository extends CommonRepository<PassSeasonEntity> {}
