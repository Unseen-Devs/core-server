import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerArgs } from '../dto/player.args';
import { PlayerEntity } from '../entities/player.entity';
import { getConnection } from 'typeorm';
import { UserRepository } from '../../users/repositories/users.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly userRepository: UserRepository, private readonly playerRepository: PlayerRepository){}

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

      const data = await this.playerRepository.createQueryBuilder('player')
        .leftJoinAndSelect(
          'player.users',
          'user')
        .where('player.id = :id', { id })
        .where('user.walletAddress = :walletAddress', { walletAddress })
        .getOne();
        
        return data;
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async findByWallet(walletAddress: string) {
    try {

      const data = await this.playerRepository.createQueryBuilder('player')
        .leftJoinAndSelect(
          'player.users',
          'user')
        .where('user.walletAddress = :walletAddress', { walletAddress })
        .getMany();
        
        return data;
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
    const players: any[] = [
      {
        rewardCode: 0,
        playerId: '',
        contestantId: '',
        firstName: '',
        lastName: '',
        shortFirstName: '',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0
      }
    ];

    await getConnection().transaction(async transactionalEntityManager => {
      players.forEach(async item => {
        const player = this.playerRepository.create(item);
        await transactionalEntityManager.save(player);
      });
    });
    
  }
}
