import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { random } from 'lodash';
import { openAkshunSignature, seasonPassStoreSignature } from 'src/modules/common/signature';
import { PlayerEntity } from 'src/modules/player/entities/player.entity';
import { PassSeasonEnum, PassStatusEnum } from '../enums/pass-season.enum';
import { PassSeasonRepository } from '../repositories/pass-season.repository';

// import { akshunStoreSignature } from 'src/modules/common/signature';

@Injectable()
export class PassSeasonService {
  constructor(
    // private readonly playerRepository: PlayerRepository,
    private readonly passSeasonRepository: PassSeasonRepository,
  ) {}

  async findOne(tokenId: string) {
    try {
      return await this.passSeasonRepository.findOne({
        where: { tokenId },
      });
    } catch (error) {
      throw new ApolloError('Get PassSeason Fail', 'get_pass_season_failed');
    }
  }

  async findByWallet(walletAddress: string) {
    try {
      return await this.passSeasonRepository.find({
        where: { walletAddress: walletAddress.toLowerCase() },
      });
    } catch (error) {
      throw new ApolloError('Get PassSeason Fail', 'get_pass_season_failed');
    }
  }

  async genPassNft(
    walletAddress: string,
    type: PassSeasonEnum,
    tokenId: string,
    transactionHash: string,
    seasonNumber: number,
  ) {
    try {
      const createData = await this.passSeasonRepository.create({
        walletAddress,
        tier: type,
        tokenId: tokenId,
        transactionHash,
        seasonNumber,
        status: PassStatusEnum.IN_PROGRESS,
      });

      return await this.passSeasonRepository.save(createData);
    } catch (error) {
      console.log(error);

      throw new ApolloError('Gen Pass Season Fail', 'gen_pass_season_failed');
    }
  }

  async generateSeasonPassStoreSignature(passId: string) {
    return await seasonPassStoreSignature(passId);
  }

  async generateOpenAkshunSignature(passId: number) {
    return await openAkshunSignature(passId);
  }
}
