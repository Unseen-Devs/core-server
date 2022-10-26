import { Field, ObjectType } from '@nestjs/graphql';
import { FixtureStatus } from '../enums/opta.enum';

@ObjectType()
export class GoalModel {
    @Field({ nullable: true })
    contestantId: string;

    @Field({ nullable: true })
    periodId: number;

    @Field({ nullable: true })
    timeMin: number;

    @Field({ nullable: true })
    timeMinSec: string;

    @Field({ nullable: true })
    lastUpdated: string;

    @Field({ nullable: true })
    timestamp: string;

    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    scorerId: string;
    
    @Field({ nullable: true })
    scorerName: string;

    @Field({nullable: true})
    scorerPlayerTouch: number;

    @Field({ nullable: true })
    assistPlayerId: string;

    @Field({ nullable: true })
    assistPlayerName: string;

    @Field({nullable: true})
    assistPlayerTouch: number;

    @Field({ nullable: true })
    optaEventId: string;

    @Field({ nullable: true })
    homeScore: number;

    @Field({ nullable: true })
    awayScore: number;

    @Field({ nullable: true })
    varReviewed: string;

    @Field({ nullable: true })
    originalDecision: string;
}

@ObjectType()
export class ScoreModel {
    @Field({ nullable: true })
    home: number;

    @Field({ nullable: true })
    away: number;
}
@ObjectType()
export class ScoresModel {
    @Field(() => ScoreModel, { nullable: true })
    ht: ScoreModel;

    @Field(() => ScoreModel, { nullable: true })
    ft: ScoreModel;

    @Field(() => ScoreModel, { nullable: true })
    total: ScoreModel
}

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

    @Field(() => FixtureStatus, { nullable: true })
    matchStatus: FixtureStatus

    @Field(() => ScoresModel, { nullable: true })
    scores: ScoresModel;

    @Field(() => [GoalModel], { nullable: true })
    goal: GoalModel[]
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