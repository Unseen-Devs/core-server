import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@ArgsType()
export class EventArgs{
    @Field({nullable: true})
    fixtureId?: string;

    @Field(() => Int)
    gameweek?: number

    @Field({nullable: true})
    playerId?: string[]

    @Field({nullable: true})
    playerIds?: string[]

    @Field({nullable: true})
    playerOptaId?: string

    @Field({description: 'format YYYY-MM-DDZ'})
    dateFrom?: string

    @Field({description: 'format YYYY-MM-DDZ'})
    dateTo?: string

    @Field({nullable: true})
    time?: string
}