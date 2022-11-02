import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { PlayerNftRepository } from '../repositories/player-nft.repository';

@Injectable()
export class PlayerNftService {
  constructor(private readonly playerNftRepository: PlayerNftRepository){}

  async findByWallet(walletAddress: string) {
    try {
      return await this.playerNftRepository.createQueryBuilder('nft')
        .leftJoinAndSelect('nft.player', 'player')
        .where('walletAddress = :walletAddress', {walletAddress})
        .getMany();
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

}
