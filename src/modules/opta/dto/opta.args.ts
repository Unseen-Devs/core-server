import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

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

export enum FixtureStatus {
  Fixture="Fixture",
  Played="Played",
  Playing="Playing",
  Cancelled="Cancelled",
  Postponed="Postponed",
  Suspended="Suspended",
  All="All"
}

@ArgsType()
export class FixturesAndResultsArgs {
  @Field(() => FixtureStatus)
  status: FixtureStatus;

  @Field(() => String)
  mtMDt: string
}

registerEnumType(FixtureStatus, {
  name: 'FixtureStatus',
});
