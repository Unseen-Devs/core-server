import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { random, uniqueId } from 'lodash';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PlayerTierEnum } from 'src/modules/player/enums/player.enum';
import { PlayerRepository } from 'src/modules/player/repositories/player.repository';
import { UserRepository } from 'src/modules/users/repositories/users.repository';
import { PlayerNftRepository } from '../repositories/player-nft.repository';
import { ClubEntity } from '../../club/entities/club.entity';

@Injectable()
export class PlayerNftService {
  constructor(
    private readonly userRepository: UserRepository,
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

  async genPlayerNft(walletAddress: string, type: PlayerTierEnum) {
    try {
      const players = await this.playerRepository.find({
        where: {
          type,
        },
      });

      const playerIds = players.map((m) => m.id);
      const playerId = playerIds[Math.floor(Math.random() * playerIds.length)];

      const player = await this.playerRepository.findOne({
        where: { id: playerId },
      });
      console.log(playerId, player);
      const createData = await this.playerNftRepository.create({
        playerId,
        walletAddress,
        rewardCode: random(1, 100),
        tokenId: uniqueId(),
      });
      return await this.playerNftRepository.save(createData);
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }
}
