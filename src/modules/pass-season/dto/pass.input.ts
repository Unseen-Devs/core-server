import { InputType, Int, Field, ID, Float, PartialType } from '@nestjs/graphql';
import { PassSeasonEnum, PassStatusEnum } from '../enums/pass-season.enum';

@InputType()
export class CreatePassInput {
  @Field(() => String)
  tokenId: string;

  @Field(() => PassSeasonEnum, {nullable: true})
  tier: PassSeasonEnum;

  @Field({nullable: true})
  transactionHash: string;

  @Field({nullable: true})
  playerNftTokenId: string;

  @Field({nullable: true})
  seasonNumber: number;
  

  @Field(() => PassStatusEnum, {nullable: true, defaultValue: PassStatusEnum.IN_PROGRESS})
  status?: PassStatusEnum;

  @Field({nullable: true})
  walletAddress: string;
}

@InputType()
export class UpdatePassInput extends PartialType(CreatePassInput){
  @Field(() => ID)
  id: string;
}
