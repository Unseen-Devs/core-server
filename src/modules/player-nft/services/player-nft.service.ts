import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { random, uniqueId } from 'lodash';
import { PlayerTierEnum } from 'src/modules/player/enums/player.enum';
import { PlayerRepository } from 'src/modules/player/repositories/player.repository';
import { UserRepository } from 'src/modules/users/repositories/users.repository';
import { PlayerNftRepository } from '../repositories/player-nft.repository';

@Injectable()
export class PlayerNftService {
  constructor(private readonly userRepository: UserRepository, private readonly playerRepository: PlayerRepository, private readonly playerNftRepository: PlayerNftRepository){}

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

  async genPlayerNft(walletAddress: string, type: PlayerTierEnum) {
    try {
      const user = await this.userRepository.findOne({where: walletAddress});
      const players = await this.playerRepository.find({
        where: {
          type
        }
      });

      const playerIds = players.map(m => m.id);
      const nft = playerIds[Math.floor(Math.random()*playerIds.length)];
      
      const player = await this.playerRepository.findOne({
        where:{id: nft}
      });
      
      const createData = await this.playerNftRepository.create({
        player,
        rewardCode: random(0, 100),
        tokenId: uniqueId(),
        user
      });
      return await this.playerNftRepository.save(createData);
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }
}
