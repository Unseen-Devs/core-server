import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EventArgs{
    @Field(() => Int)
    fixtureId?: number

    @Field(() => Int)
    gameweek?: number

    @Field()
    playerId?: string

    @Field()
    playerOptaId?: string

    @Field({description: 'format YYYY-MM-DDZ'})
    dateFrom?: string

    @Field({description: 'format YYYY-MM-DDZ'})
    dateTo?: string

    @Field()
    time?: string
}