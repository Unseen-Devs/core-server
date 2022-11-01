import { registerEnumType } from '@nestjs/graphql';
export enum PlayerTierEnum {
  TIER1 = "TIER1",
  TIER2 = "TIER2"
}

registerEnumType(PlayerTierEnum, {
  name: 'PlayerTier',
})