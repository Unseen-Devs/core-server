import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { FixtureStatus } from '../enums/opta.enum';

@ArgsType()
export class OptaListArgs {
  @Field(() => Int, {
    defaultValue: 15,
  })
  @Min(1)
  @Max(100)
  limit?: number;

  @Field(() => Int, {
    defaultValue: 1,
  })
  @Min(1)
  page?: number;
}



@ArgsType()
export class FixturesAndResultsArgs {
  @Field(() => FixtureStatus)
  status: FixtureStatus;

  @Field(() => String)
  mtMDt: string
}