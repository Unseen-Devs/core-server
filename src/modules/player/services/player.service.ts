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
        relations: ['club'],
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
      {
        rewardCode: 1,
        playerId: '',
        contestantId: '',
        firstName: 'David',
        lastName: 'de Gea',
        shortFirstName: 'David',
        shortLastName: 'de Gea',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p51940.png',
        matchName: '',
        shirtNumber: '1',
        position: 'Goalkeeper',
        positionSide: 'Goalkeeper',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 2,
        playerId: '',
        contestantId: '',
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        shortFirstName: 'Cristiano',
        shortLastName: 'Ronaldo',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p14937.png',
        matchName: '',
        shirtNumber: '7',
        position: 'Left winger',
        positionSide: '',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 3,
        playerId: '',
        contestantId: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p467169.png',
        firstName: 'Antony',
        lastName: '',
        shortFirstName: 'Antony',
        shortLastName: '',
        shirtPlayer: '',
        matchName: '',
        shirtNumber: '21',
        position: 'Forward',
        positionSide: 'Forward',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 4,
        playerId: '',
        contestantId: '',
        firstName: 'Casemiro',
        lastName: '',
        shortFirstName: 'Casemiro',
        shortLastName: '',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p61256.png',
        matchName: '',
        shirtNumber: '18',
        position: 'Midfielder',
        positionSide: 'Midfielder',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 5,
        playerId: '',
        contestantId: '',
        firstName: 'Bruno',
        lastName: 'Fernandes',
        shortFirstName: 'Bruno',
        shortLastName: 'Fernandes',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png',
        matchName: '',
        shirtNumber: '8',
        position: 'Midfielder',
        positionSide: 'Midfielder',
        formationPlace: '',
        touch: 0,
        type: 'TIER1',
      },
      {
        rewardCode: 6,
        playerId: '',
        contestantId: '',
        firstName: 'Tom',
        lastName: 'Heaton',
        shortFirstName: 'Tom',
        shortLastName: 'Heaton',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p21205.png',
        matchName: '',
        shirtNumber: '22',
        position: 'Goalkeeper',
        positionSide: 'Goalkeeper',
        formationPlace: '',
        touch: 0,
        type: 'TIER2',
      },
      {
        rewardCode: 7,
        playerId: '',
        contestantId: '',
        firstName: 'Harry',
        lastName: 'Maguire',
        shortFirstName: 'Harry',
        shortLastName: 'Maguire',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p95658.png',
        matchName: '',
        shirtNumber: '75',
        position: 'Defender',
        positionSide: 'Defender',
        formationPlace: '',
        touch: 0,
        type: 'TIER2',
      },
      {
        rewardCode: 8,
        playerId: '',
        contestantId: '',
        firstName: 'Victor',
        lastName: 'Lindelöf',
        shortFirstName: 'Victor',
        shortLastName: 'Lindelöf',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p184667.png',
        matchName: '',
        shirtNumber: '2',
        position: 'Defender',
        positionSide: 'Defender',
        formationPlace: '',
        touch: 0,
        type: 'TIER2',
      },
      {
        rewardCode: 9,
        playerId: '',
        contestantId: '',
        firstName: 'Scott',
        lastName: 'McTominay',
        shortFirstName: 'Scott',
        shortLastName: 'McTominay',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p195851.png',
        matchName: '',
        shirtNumber: '39',
        position: 'Midfielder',
        positionSide: 'Midfielder',
        formationPlace: '',
        touch: 0,
        type: 'TIER2',
      },
      {
        rewardCode: 10,
        playerId: '',
        contestantId: '',
        firstName: 'Shola',
        lastName: 'Shoretire',
        shortFirstName: 'Shola',
        shortLastName: 'Shoretire',
        shirtPlayer: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p472464.png',
        matchName: '',
        shirtNumber: '47',
        position: 'Forward',
        positionSide: 'Forward',
        formationPlace: '',
        touch: 0,
        type: 'TIER2',
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
