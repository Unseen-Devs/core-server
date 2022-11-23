import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { EventHistoryEntity } from '../entities/event-history.entity';

@EntityRepository(EventHistoryEntity)
export class EventHistoryRepository extends CommonRepository<EventHistoryEntity> {}
