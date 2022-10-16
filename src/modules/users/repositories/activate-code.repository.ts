import { EntityRepository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CommonRepository } from 'src/modules/common/common.repository';
import { ActivateCode } from '../entities/activate-code.entity';

@EntityRepository(ActivateCode)
export class ActivateCodeRepository extends CommonRepository<ActivateCode> {}
