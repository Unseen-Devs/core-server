import { EntityRepository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CommonRepository } from 'src/modules/common/common.repository';

@EntityRepository(Role)
export class RoleRepository extends CommonRepository<Role> {}
