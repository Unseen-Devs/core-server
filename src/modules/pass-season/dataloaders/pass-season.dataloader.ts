import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PassSeasonRepository } from '../repositories/pass-season.repository';
import { PassSeasonEntity } from '../entities/pass-season.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class PassSeasonDataLoader extends DataLoader<string, PassSeasonEntity> {
  constructor(private readonly passSeasonRepository: PassSeasonRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.passSeasonRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) ?? new Error('Not found'));
    });
  }
}
