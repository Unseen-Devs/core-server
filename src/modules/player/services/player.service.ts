import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerArgs } from '../dto/player.args';
import { getConnection } from 'typeorm';
import { PlayerNftEntity } from '../../player-nft/entities/player-nft.entity';
import { ClubRepository } from 'src/modules/club/repositories/club.repository';
import { PlayerEntity } from '../entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly clubRepository: ClubRepository,
  ) {}

  async findOne(id: string) {
    try {      
      return await this.playerRepository.findOne(id, {
        relations: ['club', 'events'],
      });
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async findOneByWallet(walletAddress: string, id: string) {
    try {
      const data = await this.playerRepository
        .createQueryBuilder('player')
        .leftJoinAndSelect('player.nft', 'nft')
        .where('player.id = :id', { id })
        .where('nft.walletAddress = :walletAddress', { walletAddress })
        .getOne();

      return data;
    } catch (error) {
      console.log('error', error);
      throw new ApolloError('Get Player Fail', 'get_player_failed');
    }
  }

  async findByWallet(walletAddress: string) {
    try {
      const data = await this.playerRepository
        .createQueryBuilder('player')
        .leftJoinAndSelect(PlayerNftEntity, 'nft', 'player.id = nft.playerId')
        .where('nft.walletAddress = :walletAddress', { walletAddress })
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
    const players: any[] = [];

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      players.forEach(async (item) => {
        const club = await this.clubRepository.findOne({
          where: { id: item.clubId },
        });
        item.club = club;
        const player = this.playerRepository.create(item);
        await this.playerRepository.save(player);
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return this.playerRepository.find();
  }

  async getAllPlayerOptaId(){
    const data = await this.playerRepository
        .createQueryBuilder('player')
        .getMany();
    return data.length ? data.map(d => d.optaId) : [];
  }

  async findAll(){
    return await this.playerRepository.find();
  }
}
