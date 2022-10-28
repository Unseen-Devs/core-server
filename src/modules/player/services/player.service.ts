import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerArgs } from '../dto/player.args';
import { PlayerEntity } from '../entities/player.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository){}

  async findOne(id: string) {
    try {
      return await this.playerRepository.findOne(id);  
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async findOneByWallet(walletAddress: string, id: string) {
    try {
      return await this.playerRepository.findOne({
        where: {
          id,
          walletAddress
        }
      });  
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async pagination({ page, limit, filters }: PlayerArgs) {
    return this.playerRepository.paginate(
      {
        page,
        limit,
        filters,
      },
      {
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }

  async generatePlayer() {
    const players: PlayerEntity[] = [
      
    ];

    await getConnection().transaction(async transactionalEntityManager => {
      players.forEach(async item => {
        const player = this.playerRepository.create(item);
        await transactionalEntityManager.save(player);
      });
    });
    
  }
}
