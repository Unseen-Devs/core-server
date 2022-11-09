import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { EventEntity } from '../entities/event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends CommonRepository<EventEntity> {}
