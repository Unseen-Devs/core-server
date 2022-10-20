import { Field, ObjectType } from '@nestjs/graphql';
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