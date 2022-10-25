import { registerEnumType } from "@nestjs/graphql";

export enum FixtureStatus {
  Fixture="Fixture",
  Played="Played",
  Playing="Playing",
  Cancelled="Cancelled",
  Postponed="Postponed",
  Suspended="Suspended",
  All="All"
}

registerEnumType(FixtureStatus, {
  name: 'FixtureStatus',
});
