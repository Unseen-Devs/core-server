import { registerEnumType } from '@nestjs/graphql';
export enum RewardTypeEnum {
  TOUCH = 'TOUCH'
}

registerEnumType(RewardTypeEnum, {
  name: 'RewardType'
})

export enum RewardStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

registerEnumType(RewardStatusEnum, {
  name: 'RewardStatus'
})