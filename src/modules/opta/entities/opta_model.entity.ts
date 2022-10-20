import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class TournamentCalendarInfo {
  @Field({nullable: true})
  id: string;

  @Field({nullable: true})
  includesVenues: string;

  @Field({nullable: true})
  ocId: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  startDate: string;

  @Field({nullable: true})
  endDate: string;

  @Field({nullable: true})
  active: string;

  @Field({nullable: true})
  lastUpdated: Date;

  @Field({nullable: true})
  includesStandings: string
}

@ObjectType()
export class CompetitionModel {
  @Field({nullable: true})
  id: string;

  @Field({nullable: true})
  ocId: string;

  @Field({nullable: true})
  opId: string;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  competitionCode: string;

  @Field({nullable: true})
  displayOrder: number;

  @Field({nullable: true})
  country: string;

  @Field({nullable: true})
  countryId: string;

  @Field({nullable: true})
  countryCode: string;

  @Field({nullable: true})
  isFriendly: string;

  @Field({nullable: true})
  competitionFormat: string;

  @Field({nullable: true})
  type: string;
  @Field(()=> [TournamentCalendarInfo], { nullable : true })
  tournamentCalendar: TournamentCalendarInfo[];

  @Field({nullable: true})
  competitionType: string;
}

@ObjectType()
export class TournamentCalendarModel {
  @Field(()=> [CompetitionModel], { nullable : true })
  competition: CompetitionModel[];
  lastUpdated: Date;
}