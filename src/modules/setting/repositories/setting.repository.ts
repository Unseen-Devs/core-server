import { EntityRepository } from 'typeorm';
import { Setting } from '../entities/setting.entity';
import { CommonRepository } from 'src/modules/common/common.repository';

@EntityRepository(Setting)
export class SettingRepository extends CommonRepository<Setting> {}
