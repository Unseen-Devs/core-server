import { Module } from '@nestjs/common';
import { ClubService } from './services/club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './entities/club.entity';
import { ClubRepository } from './repositories/club.repository';
import { UserRepository } from '../users/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, ClubRepository, UserRepository])],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
