import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { Member } from '../entities/member.entity';

@EntityRepository(Member)
export class MemberRepository extends CommonRepository<Member> {}
