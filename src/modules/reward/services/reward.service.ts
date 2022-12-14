import { Injectable } from '@nestjs/common';
import { CreateRewardInput } from '../dto/reward.input';
import { RewardEntity } from '../entities/reward.entity';
import { RewardStatusEnum, RewardTypeEnum } from '../enums/reward.enum';
import { RewardRepository } from '../repositories/reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async getBywalletAddress(walletAddress: string) {
    return await this.rewardRepository.find({
      where: {
        walletAddress: walletAddress.toLocaleLowerCase(),
        // status: RewardStatusEnum.IN_PROGRESS
      }
    })
  }


  async getDetailReward(id: string) {
    return await this.rewardRepository.findOne({
      where: {
        id
      }
    })
  }

  async getRewardByWalletAndType(walletAddress: string, type?: RewardTypeEnum) {
    const rewardType = type || RewardTypeEnum.TOUCH;
    return await this.rewardRepository.findOne({
      where: {
        walletAddress,
        rewardType
      }
    });
  }

  async create(data: Partial<RewardEntity>): Promise<RewardEntity> {
    const entity = new RewardEntity(data);
    return this.rewardRepository.save(entity);
}

  async update(id: string, data: Partial<RewardEntity>): Promise<RewardEntity> {
    await this.rewardRepository.update(id, data);
    return this.rewardRepository.findOneOrFail(id);
  }
}
