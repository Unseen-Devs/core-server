import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { random } from 'lodash';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PlayerTierEnum } from 'src/modules/player/enums/player.enum';
import { PlayerRepository } from 'src/modules/player/repositories/player.repository';
import { PlayerNftRepository } from '../repositories/player-nft.repository';
import { ClubEntity } from '../../club/entities/club.entity';
import { akshunStoreSignature } from 'src/modules/common/signature';

@Injectable()
export class PlayerNftService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerNftRepository: PlayerNftRepository,
  ) {}

  async findByWallet(walletAddress: string) {
    try {
      return await this.playerNftRepository
        .createQueryBuilder('nft')
        .leftJoinAndSelect(PlayerEntity, 'player', 'nft.playerId = player.id')
        .leftJoinAndSelect(ClubEntity, 'club', 'player.clubId = club.id')
        .where('walletAddress = :walletAddress', { walletAddress })
        .getMany();
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async genPlayerNft(walletAddress: string, type: PlayerTierEnum, tokenId: string, transactionHash: string) {
    try {
      const players = await this.playerRepository.find({
        where: {
          type,
        },
      });

      const playerIds = players.map((m) => m.id);
      const playerId = playerIds[Math.floor(Math.random() * playerIds.length)];

      const owerNftIds = await this.playerNftRepository.find({
        where: {
          playerId,
          walletAddress,
        },
      });

      const rewardCodes = owerNftIds.map((e, index) => {
        return e.rewardCode;
      });

      function generateRandom(min, max, exclude) {
        let random;
        while (!random) {
          const x = Math.floor(Math.random() * (max - min + 1)) + min;
          if (exclude.indexOf(x) === -1) random = x;
        }
        return random;
      }
      
      const createData = await this.playerNftRepository.create({
        playerId,
        walletAddress,
        rewardCode: generateRandom(1, 100, rewardCodes),
        tokenId: tokenId,
        transactionHash,
      });
      return await this.playerNftRepository.save(createData);
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async generateAkshunStoreSignature(walletAddress: string) {
    return await akshunStoreSignature(walletAddress);
  }
}
