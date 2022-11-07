import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { ClubEntity } from '../entities/club.entity';

@EntityRepository(ClubEntity)
export class ClubRepository extends CommonRepository<ClubEntity> {}
