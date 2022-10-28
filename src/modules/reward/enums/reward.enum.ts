import { registerEnumType } from '@nestjs/graphql';
export enum RewardTypeEnum {
  Touch = 'TOUCH'
}

registerEnumType(RewardTypeEnum, {
  name: 'RewardType'
})