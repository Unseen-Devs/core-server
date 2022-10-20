import { EntityRepository } from 'typeorm';
import { Opta } from '../entities/opta.entity';
import { CommonRepository } from 'src/modules/common/common.repository';

@EntityRepository(Opta)
export class OptaRepository extends CommonRepository<Opta> {}
