import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { MatchContestantModel } from './tournament.entity';


@ObjectType()
export class MatchEventGoal {

    @Field({nullable: true})
    contestantId: string;

    @Field({nullable: true})
    periodId: number;

    @Field({nullable: true})
    timeMin: number;

    @Field({nullable: true})
    timeMinSec: string;

    @Field({nullable: true})
    lastUpdated: string;

    @Field({nullable: true})
    timestamp: string;

    @Field({nullable: true})
    type: string;

    @Field({nullable: true})
    scorerId: string;

    @Field({nullable: true})
    scorerName: string;

    @Field({nullable: true})
    assistPlayerId: string;

    @Field({nullable: true})
    assistPlayerName: string;

    @Field({nullable: true})
    secondAssistPlayerId: string;

    @Field({nullable: true})
    ocSecondAssistPlayerId: string;

    @Field({nullable: true})
    opSecondAssistPlayerId: string;

    @Field({nullable: true})
    secondAssistPlayerName: string;

    @Field({nullable: true})
    optaEventId: string;

    @Field({nullable: true})
    homeScore: number;

    @Field({nullable: true})
    awayScore: number;

    @Field({nullable: true, defaultValue: 0})
    assistPlayerTouch?: number;

    @Field({nullable: true, defaultValue: 0})
    scorerPlayerTouch?: number;
}

@ObjectType()
export class MatchEventModel{

    @Field({nullable: true})
    description: string;

    @Field(()=> [MatchContestantModel], { nullable : true })
    contestant: MatchContestantModel[]

    @Field(()=> [MatchEventGoal], { nullable : true })
    goal: MatchEventGoal[]
}

@ObjectType()
export class MatchEventQualifierModel {
    @Field({nullable: true})
    id: number;

    @Field({nullable: true})
    qualifierId: number;

    @Field({nullable: true})
    value: string;
}

@ObjectType()
export class MatchEventEventModel {
    @Field({nullable: true})
    id: number;

    @Field({nullable: true})
    eventId: number;

    @Field(() => Int, {nullable: true})
    typeId: number;

    @Field(() => Int, {nullable: true})
    periodId: number;

    @Field(() => Int, {nullable: true})
    timeMin: number;

    @Field(() => Int, {nullable: true})
    timeSec: number;

    @Field({nullable: true})
    contestantId: string;

    @Field({nullable: true})
    playerId: string;

    @Field(() => String, {nullable: true})
    playerName: string;

    @Field({nullable: true})
    outcome: number;

    @Field(() => Float, {nullable: true})
    x: number;

    @Field(() => Float, {nullable: true})
    y: number;

    @Field({nullable: true})
    timeStamp: string;

    @Field({nullable: true})
    lastModified: string;

    @Field(() => [MatchEventQualifierModel], {nullable: true})
    qualifier: MatchEventQualifierModel[];
}

@ObjectType()
export class MatchEventMA3Model{

    @Field({nullable: true})
    description: string;

    @Field(()=> [MatchContestantModel], { nullable : true })
    contestant: MatchContestantModel[]

    @Field(()=> [MatchEventEventModel], { nullable : true })
    event: MatchEventEventModel[]
}

@ObjectType()
export class MA3Model {
    @Field({nullable: true})
    fixtureId: string;

    @Field(()=> [MatchEventGoal], { nullable : true, defaultValue: []})
    goal: MatchEventGoal[];
}