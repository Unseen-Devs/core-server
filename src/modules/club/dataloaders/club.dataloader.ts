import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ClubRepository } from '../repositories/club.repository';
import { ClubEntity } from '../entities/club.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class ClubDataLoader extends DataLoader<string, ClubEntity> {
  constructor(private readonly clubRepository: ClubRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.clubRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) ?? new Error('Not found'));
    });
  }
}
