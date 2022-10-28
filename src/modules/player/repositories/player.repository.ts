import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { PlayerEntity } from '../entities/player.entity';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends CommonRepository<PlayerEntity> {}
