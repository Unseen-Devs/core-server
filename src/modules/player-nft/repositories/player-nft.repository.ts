import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { PlayerNftEntity } from '../entities/player-nft.entity';

@EntityRepository(PlayerNftEntity)
export class PlayerNftRepository extends CommonRepository<PlayerNftEntity> {}
