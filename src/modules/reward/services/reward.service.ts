import { Injectable } from '@nestjs/common';
import { RewardTypeEnum } from '../enums/reward.enum';
import { RewardRepository } from '../repositories/reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async getBywalletAddress(walletAddress: string) {
    return await this.rewardRepository.find({
      where: {
        walletAddress
      }
    })
  }

  async getRewardByWalledAndType(walletAddress: string, type?: RewardTypeEnum) {
    const rewardType = type || RewardTypeEnum.Touch;
    return await this.rewardRepository.findOne({
      where: {
        walletAddress,
        rewardType
      }
    });
  }
}