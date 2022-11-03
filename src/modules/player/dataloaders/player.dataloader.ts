import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerEntity } from '../entities/player.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class PlayerDataLoader extends DataLoader<string, PlayerEntity> {
  constructor(private readonly playerRepository: PlayerRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.playerRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) ?? new Error('Not found'));
    });
  }
}
