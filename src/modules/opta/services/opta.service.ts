import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server';
import axios from 'axios';
import { TournamentCalendarModel } from '../entities/opta_model.entity';
import { TournamentScheduleDetailModel } from '../entities/tournament.entity';
import { FixturesAndResultsArgs } from '../dto/opta.args';
import { uniq } from 'lodash'
import { PlayerService } from 'src/modules/player/services/player.service';
import { MA3Precondition, PlayerTouchModel } from '../entities/match_event_model.entity';

const OPTA_OUTLET_AUTH_KEY = process.env.OPTA_OUTLET_AUTH_KEY;
const OPTA_BASE_URL = process.env.OPTA_BASE_URL;
const touchEventTypeIds = [1,2,3,7,8,10,11,12,13,14,15,16,41,42,50,54,61,73,74];

@Injectable()
export class OptaService {
  constructor(
    private readonly playerService: PlayerService
  ) {}

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

  async getFixtures(input: FixturesAndResultsArgs){
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
        lineups: "yes",
        status: status,
        "mt.mDt": mtMDt,//[YYYY-MM-DDTHH:MM:SSZ TO YYYY-MM-DDTHH:MM:SSZ]
      }
    }).then(async (response) => {
      if(response.status !== 200){
        console.log('Get Tournament Schedule Fail');
        // throw new ApolloError('Get Tournament Schedule Fail', 'get_tournament_schedule_failed');
      }
      return response.data.match;
    }).catch((error) => {
      console.log('Get Fixtures and Results Fail', error);
      // throw new ApolloError('Get Fixtures and Results Fail', 'get_fixtures_results_failed');
    });
  }

  async getFixturesAndResults(input: FixturesAndResultsArgs, playerOptaId?: string){
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
    }).then(async (response) => {
      if(response.status !== 200){
        console.log('Get Fixtures and Results Fail');
        // throw new ApolloError('Get Fixtures and Results Fail', 'get_tournament_schedule_failed');
      }
      const data = response.data.match;
      // Touch
      const prsn = playerOptaId ?? 'atzboo800gv7gic2rgvgo0kq1';
      const promises: Promise<any>[] = [];
      data.forEach(d => {
        const urlTouch = `${OPTA_BASE_URL}/matchevent/${OPTA_OUTLET_AUTH_KEY}/${d.matchInfo.id}`;
        
        if (d.liveData.goal && d.liveData.goal.map(o => {
          if(prsn === o.assistPlayerId || prsn === o.scorerId)
          return prsn;
        }).includes(prsn)) {
          promises.push(axios.get(urlTouch, {
              params: {
                _rt: "b",
                _fmt: "json",
                type: touchEventTypeIds.toString(),
                prsn,
              }
            }));
        }
      });      
      
      const dataEvents: any[] = [];
      await Promise.all(promises).then(res => {
        res.forEach(r => {
          if(r.data)
          dataEvents.push({
            id: r.data.matchInfo.id,
            event: r.data.liveData.event.filter(f => (touchEventTypeIds.includes(f.typeId) || (f.typeId == 4 && f.outcome == 1)))
          });
        });
      }).catch(err => {console.log(err)})
      const rs = data.map(d => {
        const event = dataEvents.find(f => (f.id == d.matchInfo.id));
        if(d.liveData.goal)
        d.liveData.goal.map(e => {
          if (event) {
            const events: any[] = event.event;
            e.assistPlayerTouch = events.findIndex(f => (f.assist == 1 && f.playerId == e.assistPlayerId)) + 1;

            e.scorerPlayerTouch = events.findIndex(f => (f.typeId == 16 && f.playerId == e.scorerId)) + 1;
          }
          return e;
        })

        const obj =  {
          id: d.matchInfo.id,
          date: d.matchInfo.date,
          time: d.matchInfo.time,
          contestant: d.matchInfo.contestant,
          matchStatus: d.liveData.matchDetails.matchStatus,
          scores: d.liveData.matchDetails.scores,
          goal: d.liveData.goal,
        };

        return obj;
      })
      return { match: rs };

    }).catch((error) => {
      console.log('Get Fixtures and Results Fail', error);
      // throw new ApolloError('Get Fixtures and Results Fail', 'get_fixtures_results_failed');
    });
  } 

  async getPreConditionsMatchEvents(input: FixturesAndResultsArgs){
    const getFixtures = await this.getFixtures(input);
    const conditions: MA3Precondition[] = [];
    const playerOptaIds = await this.playerService.getAllPlayerOptaId();
    
    getFixtures.forEach(d => {
      d.liveData.lineUp.forEach(l => {
        const playerIds: string[] = [];
        l.player.forEach(p => {
          if(playerOptaIds.includes(p.playerId)){
            playerIds.push(p.playerId);
          }
        })
        conditions.push({
          fixtureId: d.matchInfo.id,
          date: d.matchInfo.date,
          time: d.matchInfo.time,
          gameweek: Number(d.matchInfo.week),
          playerIds,
          goal: d.liveData.goal ?? [],
          contestant: d.matchInfo.contestant
        })
      })
    });
    
    return conditions;
  }

  async getPlayerIdFromOptaId(){
    const players = await this.playerService.findAll();
    const rs = new Map<string, string>();
    players.forEach(p => {
      rs.set(p.optaId ,p.id)
    });
    return rs;
  }

  async getPastMatchesEvents(input: FixturesAndResultsArgs){
    const conditions = await this.getPreConditionsMatchEvents(input);
    const players = await this.getPlayerIdFromOptaId();
    const dataEvents: PlayerTouchModel[] = [];
    for(let condition of conditions) {    
      const fixtureId = condition.fixtureId;
      const goal = condition.goal;
      const playerIds = condition.playerIds;
      const urlTouch = `${OPTA_BASE_URL}/matchevent/${OPTA_OUTLET_AUTH_KEY}/${fixtureId}`;
      for (let prsn of playerIds) {
        await axios.get(urlTouch, {
          params: {
            _rt: "b",
            _fmt: "json",
            type: touchEventTypeIds.toString(),
            prsn,
          }
        }).then(async (response) => {
          const touchEvents = response.data.liveData.event.filter(f => (touchEventTypeIds.includes(f.typeId) || (f.typeId == 4 && f.outcome == 1)));
          const totalTouches = touchEvents.length;
          const assistTouches: number[] = [];
          const scorerTouches : number[]= [];
          goal?.forEach(g =>{ 
            const assistTouch = touchEvents.findIndex(f => (f.assist == 1 && f.playerId == g.assistPlayerId)) + 1;
            const scorerTouch = touchEvents.findIndex(f => (f.typeId == 16 && f.playerId == g.scorerId)) + 1
            if(assistTouch > 0) assistTouches.push(assistTouch);
            if(scorerTouch > 0) scorerTouches.push(scorerTouch);
          })
          
          const obj = {
            fixtureId,
            date: condition.date,
            time: condition.time,
            gameweek: condition.gameweek,
            playerOptaId: prsn,
            playerId: players.get(prsn) ?? null,
            totalTouches,
            scorerTouches: uniq(scorerTouches),
            assistTouches: uniq(assistTouches)
          }
          dataEvents.push(obj);
        }).catch(err => { });
      }
    }
    return dataEvents;
  }
}
