import DataLoader from 'dataloader';
import { Opta } from '../entities/opta.entity';
import { Injectable, Scope } from '@nestjs/common';
import { OptaRepository } from '../repositories/opta.repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class OptaDataLoader extends DataLoader<string, Opta> {
  constructor(private readonly optaRepository: OptaRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.optaRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) ?? new Error('Not found'));
    });
  }
}
