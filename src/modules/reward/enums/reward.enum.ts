import { registerEnumType } from '@nestjs/graphql';
export enum RewardTypeEnum {
  Touch = 'TOUCH'
}

registerEnumType(RewardTypeEnum, {
  name: 'RewardType'
})

export enum RewardStatusEnum {
  Completed = 'COMPLETED'
}

registerEnumType(RewardStatusEnum, {
  name: 'RewardStatus'
})