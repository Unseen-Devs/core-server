import { Args, Query, Resolver } from '@nestjs/graphql';
import { Opta } from '../entities/opta.entity';
import { OptaService } from '../services/opta.service';
import { TournamentCalendarModel } from '../entities/opta_model.entity';
import { FixturesModelAndResultsModel, TournamentScheduleModel } from '../entities/tournament.entity';
import { MatchEventModel, MatchEventMA3Model, MA3Model } from '../entities/match_event_model.entity';
import { FixturesAndResultsArgs } from '../dto/opta.args';

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

  @Query(() => MatchEventModel, {
    nullable: true,
  })
  async getMatchEvents(@Args('fixtureId', { type: () => String }) fixtureId: string) {
    return await this.optaService.getMatchEvents(fixtureId);
  }

  @Query(() => MatchEventMA3Model, {
    nullable: true
  })
  async getMatchEventsMA3() {
    return await this.optaService.getMatchEventsMA3("7ly4fqhihqbfm8nwseibc97h0", "bijr1ghojrxc61se7ebt72f9x");
  }

  @Query(() => [MA3Model], {
    nullable: true
  })
  async getNFTMA3Events(@Args() input: FixturesAndResultsArgs) {
    return await this.optaService.getNFTMA3Events(input);
  }
}
