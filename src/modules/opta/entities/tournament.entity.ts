import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MatchInfoModel {

    @Field({nullable: true})
    id: string;

    @Field({nullable: true})
    date: string;

    @Field({nullable: true})
    time: string;

    @Field(()=> [MatchContestantModel], { nullable : true })
    contestant: MatchContestantModel[]
}


@ObjectType()
export class MatchContestantModel {

    @Field({nullable: true})
    id: string;

    @Field({nullable: true})
    name: string;
    @Field({nullable: true})
    shortName: string;

    @Field({nullable: true})
    officialName: string;

    @Field({nullable: true})
    code: string;

    @Field({nullable: true})
    position: string;
}

@ObjectType()
export class FixturesModelAndResultsModel {
    @Field(()=> [MatchInfoModel], { nullable : true })
    match: MatchInfoModel[]
}

@ObjectType()
export class TournamentScheduleDetailModel {
    @Field({nullable: true})
    id: string;

    @Field({nullable: true})
    coverageLevel: string;

    @Field({nullable: true})
    optaBetting:string;

    @Field({nullable: true})
    date: string;

    @Field({nullable: true})
    time: string;

    @Field({nullable: true})
    localDate: string;

    @Field({nullable: true})
    localTime: string;

    @Field({nullable: true})
    homeContestantId: string;

    @Field({nullable: true})
    awayContestantId: string;

    @Field({nullable: true})
    homeContestantName: string;

    @Field({nullable: true})
    awayContestantName: string;

    @Field({nullable: true})
    homeContestantOfficialName: string;

    @Field({nullable: true})
    awayContestantOfficialName: string;

    @Field({nullable: true})
    homeContestantShortName: string;

    @Field({nullable: true})
    awayContestantShortName: string;

    @Field({nullable: true})
    homeContestantCode: string;

    @Field({nullable: true})
    awayContestantCode: string;

    @Field({nullable: true})
    numberOfPeriods: number;

    @Field({nullable: true})
    periodLength: number;
    constructor(model: any) {}
}

@ObjectType()
export class TournamentScheduleModel {
    @Field(()=> [TournamentScheduleDetailModel], { nullable : true })
    schedule: TournamentScheduleDetailModel[]
}