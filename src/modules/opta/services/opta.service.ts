import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server';
import axios from 'axios';
import { TournamentCalendarModel } from '../entities/opta_model.entity';
import { TournamentScheduleDetailModel } from '../entities/tournament.entity';
import { FixturesAndResultsArgs } from '../dto/opta.args';

const OPTA_OUTLET_AUTH_KEY = process.env.OPTA_OUTLET_AUTH_KEY;
const OPTA_BASE_URL = process.env.OPTA_BASE_URL;

@Injectable()
export class OptaService {
  constructor() {}

  async getTournamentCalendar() {
    const url = `${OPTA_BASE_URL}/tournamentcalendar/${OPTA_OUTLET_AUTH_KEY}/active/authorized\?_rt\=b\&_fmt\=json`;
    return await axios.get(url).then((response) => {
      if(response.status !== 200){
        throw new ApolloError('Something went wrong', 'get_tournament_calendar_failed');
      }
      const data: TournamentCalendarModel = response.data;
      return data;
    }).catch((error) => {
      console.log('error', error);
      throw new ApolloError('Get Tournament Calendar Fail', 'get_tournament_calendar_failed');
    });
  }

  async getTournamentSchedule() {
    const tournamentCalendar = await this.getTournamentCalendar();
    if(!tournamentCalendar){
      throw new ApolloError('Get Tournament Calendar Fail', 'get_tournament_calendar_failed');
    }
    const tournamentCalendarId = tournamentCalendar.competition[0]?.tournamentCalendar[0]?.id;
    const url = `${OPTA_BASE_URL}/tournamentschedule/${OPTA_OUTLET_AUTH_KEY}\?tmcl=${tournamentCalendarId}&_rt\=b\&_fmt\=json`;
    return await axios.get(url).then((response) => {
      if(response.status !== 200){
        throw new ApolloError('Get Tournament Schedule Fail', 'get_tournament_schedule_failed');
      }
      const rs: TournamentScheduleDetailModel[] = [];
      const data = response.data.matchDate;
      data.map(d => {
        d.match.forEach(m => {
          rs.push({
            id: m.id,
            coverageLevel: m.coverageLevel,
            optaBetting: m.optaBetting,
            date: m.date,
            time: m.time,
            localDate: m.localDate,
            localTime: m.localTime,
            homeContestantId: m.homeContestantId,
            awayContestantId: m.awayContestantId,
            homeContestantName: m.homeContestantName,
            awayContestantName: m.awayContestantName,
            homeContestantOfficialName: m.homeContestantOfficialName,
            awayContestantOfficialName: m.awayContestantOfficialName,
            homeContestantShortName: m.homeContestantShortName,
            awayContestantShortName: m.awayContestantShortName,
            homeContestantCode: m.homeContestantCode,
            awayContestantCode: m.awayContestantCode,
            numberOfPeriods: m.numberOfPeriods,
            periodLength: m.periodLength,
          });
        })        
      })
      return { schedule: rs};
      
    }).catch((error) => {
      console.log('error', error);
      throw new ApolloError('Get Tournament Schedule Fail', 'get_tournament_schedule_failed');
    });
  }

  async getFixturesAndResults(input: FixturesAndResultsArgs){
    const tournamentCalendar = await this.getTournamentCalendar();
    if(!tournamentCalendar){
      throw new ApolloError('Get Tournament Calendar Fail', 'get_tournament_calendar_failed');
    }
    const tournamentCalendarId = tournamentCalendar.competition[0]?.tournamentCalendar[0]?.id;
    const url = `${OPTA_BASE_URL}/match/${OPTA_OUTLET_AUTH_KEY}\?tmcl=${tournamentCalendarId}`;

    const {
      status,
      mtMDt
    } = input;
    return await axios.get(url, {
      params: {
        _rt: "b",
        _fmt: "json",
        _ordSrt: "asc",
        live: "yes",
        status: status,
        "mt.mDt": mtMDt,//[YYYY-MM-DDTHH:MM:SSZ TO YYYY-MM-DDTHH:MM:SSZ]
      }
    }).then((response) => {
      if(response.status !== 200){
        throw new ApolloError('Get Fixtures and Results Fail', 'get_tournament_schedule_failed');
      }
      const data = response.data.match;
      const rs = data.map(d => {
        console.log("data match", d);
        return {
          id: d.matchInfo.id,
          date: d.matchInfo.date,
          time: d.matchInfo.time,
          contestant: d.matchInfo.contestant,
          scores: d.liveData.matchDetails.scores,
          goal: d.liveData.goal,
        }
      })
      return { match: rs };

    }).catch((error) => {
      console.log('error', error);
      throw new ApolloError('Get Fixtures and Results Fail', 'get_fixtures_results_failed');
    });
  }
  
  async getMatchEvents(fixtureId: string){
    const url = `${OPTA_BASE_URL}/matchstats/${OPTA_OUTLET_AUTH_KEY}/${fixtureId}\?_rt\=b\&_fmt\=json`;
    return await axios.get(url).then((response) => {
      if(response.status !== 200){
        throw new ApolloError('Get Match Stats Fail', 'get_match_event_failed');
      }
      const data = response.data;
      const contestant = data.matchInfo.contestant;
      const goal = data.liveData.goal;
      return {
        description: data.matchInfo.description,
        contestant: contestant.map(c =>  {
          return {
            shortName: c.shortName
          }
        }),
        goal: goal.map(g => {
          return {
            timeMin: g.timeMin,
            timeMinSec: g.timeMinSec,
            scorerName: g.scorerName,
            assistPlayerName: g.assistPlayerName?? '',
          }
        })
      };
    }).catch((error) => {
      console.log('error', error);
      throw new ApolloError('Get Match Stats Fail', 'get_match_event_failed');
    });
  }
}
