import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerArgs } from '../dto/player.args';
import { PlayerEntity } from '../entities/player.entity';
import { getConnection } from 'typeorm';
import { UserRepository } from '../../users/repositories/users.repository';
import { PlayerNftEntity } from '../../player-nft/entities/player-nft.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly userRepository: UserRepository, private readonly playerRepository: PlayerRepository) {}

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
    const players: any[] = [
      // Arsenal
      {
        rewardCode: 1,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Gabriel',
        lastName: 'Jesus',
        shortFirstName: 'Gabriel',
        shortLastName: 'Jesus',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 2,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Gabriel',
        lastName: '',
        shortFirstName: 'Gabriel',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 3,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Saka',
        lastName: '',
        shortFirstName: 'Saka',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 4,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Odegard',
        lastName: '',
        shortFirstName: 'Odegard',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 5,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Smith',
        lastName: 'Rowe',
        shortFirstName: 'Smith',
        shortLastName: 'Rowe',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 6,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Martinelli',
        lastName: '',
        shortFirstName: 'Martinelli',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 7,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Nketiah',
        lastName: '',
        shortFirstName: 'Nketiah',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 8,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'zinchenko',
        lastName: '',
        shortFirstName: 'zinchenko',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      // Aston Villa
      {
        rewardCode: 9,
        playerId: '',
        clubId: '1',
        contestantId: '',
        firstName: 'Ings',
        lastName: '',
        shortFirstName: 'Ings',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 10,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Watkins',
        lastName: '',
        shortFirstName: 'Watkins',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 11,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Cash',
        lastName: '',
        shortFirstName: 'Cash',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 12,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Coutinho',
        lastName: '',
        shortFirstName: 'Coutinho',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 13,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Jacob',
        lastName: 'Ramsey',
        shortFirstName: 'Jacob',
        shortLastName: 'Ramsey',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 14,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Buendia',
        lastName: '',
        shortFirstName: 'Buendia',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      // Bournemouth
      {
        rewardCode: 15,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Billing',
        lastName: '',
        shortFirstName: 'Billing',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 16,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Anthony',
        lastName: '',
        shortFirstName: 'Anthony',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      // brentford

      {
        rewardCode: 17,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Jansson',
        lastName: '',
        shortFirstName: 'Jansson',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 18,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'toney',
        lastName: '',
        shortFirstName: 'toney',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 19,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'mbeumo',
        lastName: '',
        shortFirstName: 'mbeumo',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 20,
        playerId: '',
        clubId: '2',
        contestantId: '',
        firstName: 'Wissa',
        lastName: '',
        shortFirstName: 'Wissa',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '',
        position: '',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
    ];

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      players.forEach(async (item) => {
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
}
