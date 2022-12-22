import { Field, InputType } from "@nestjs/graphql";
import { FixtureStatus } from "src/modules/opta/enums/opta.enum";

@InputType()
export class FixturesAndResultsDTO {
  @Field(() => FixtureStatus)
  status: FixtureStatus;

  // @Field(() => String)
  // mtMDt: string;

  @Field(() => String)
  week: string;
}
