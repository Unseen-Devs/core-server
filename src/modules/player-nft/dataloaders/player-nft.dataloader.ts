import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PlayerNftRepository } from '../repositories/player-nft.repository';
import { PlayerNftEntity } from '../entities/player-nft.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class PlayerNftDataLoader extends DataLoader<string, PlayerNftEntity> {
  constructor(private readonly playerNftRepository: PlayerNftRepository) {
    super(async (ids: ReadonlyArray<string>) => {
      const rows = await this.playerNftRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) ?? new Error('Not found'));
    });
  }
}
