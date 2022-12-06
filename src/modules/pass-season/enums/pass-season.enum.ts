import { registerEnumType } from '@nestjs/graphql';

export enum PassStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

registerEnumType(PassStatusEnum, {
  name: 'PassSeasonStatus'
})


export enum PassSeasonEnum {
  TIER1 = "TIER1",
  TIER2 = "TIER2"
}

registerEnumType(PassSeasonEnum, {
  name: 'PassTier',
})