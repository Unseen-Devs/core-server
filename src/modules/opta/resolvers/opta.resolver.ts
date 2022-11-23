import { Args, Query, Resolver } from '@nestjs/graphql';
import { Opta } from '../entities/opta.entity';
import { OptaService } from '../services/opta.service';
import { TournamentCalendarModel } from '../entities/opta_model.entity';
import { FixturesModelAndResultsModel, TournamentScheduleModel } from '../entities/tournament.entity';
import { FixturesAndResultsArgs } from '../dto/opta.args';
import { PlayerTouchModel } from '../entities/match_event_model.entity';

@Resolver(() => Opta)
export class OptaResolver {
  constructor(private readonly optaService: OptaService) {}

  @Query(() => TournamentCalendarModel, {
    nullable: true,
  })
  async getTournamentCalendar() {
    return await this.optaService.getTournamentCalendar();
  }

  @Query(() => TournamentScheduleModel, {
    nullable: true,
  })
  async getTournamentSchedule() {
    return await this.optaService.getTournamentSchedule();
  }

  @Query(() => FixturesModelAndResultsModel, {
    nullable: true,
  })
  async getFixturesAndResults(@Args() input: FixturesAndResultsArgs) {

    return await this.optaService.getFixturesAndResults(input);
  }

  @Query(() => [PlayerTouchModel], {
    nullable: true
  })
  async getNFTMA3Events(@Args() input: FixturesAndResultsArgs) {
    return await this.optaService.getPastMatchesEvents(input);
  }
}
