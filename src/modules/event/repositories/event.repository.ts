import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { EventEntity } from '../entities/event.entity';
import { PlayerTouchModel } from 'src/modules/opta/entities/match_event_model.entity';
import { EventArgs } from '../dtos/event.dto';

@EntityRepository(EventEntity)
export class EventRepository extends CommonRepository<EventEntity> {
    createEvents(input: PlayerTouchModel[]){
        const events: Partial<EventEntity>[] = [];
        input.map((i) => {
            const obj = {
                fixtureId: i.fixtureId,
                playerId: i.playerId ?? '',
                playerOptaId: i.playerOptaId,
                date: i.date,
                time: i.time,
                gameweek: i.gameweek,
                totalTouch: i.totalTouches,
                scorerTouches: i.scorerTouches,
                assistTouches: i.assistTouches
            }
            events.push(obj);
        });
        return this.create(events);
    }

    getEvents(args: EventArgs){
        const { fixtureId, dateFrom, dateTo, gameweek, playerId, playerOptaId} = args;
        const query = this.createQueryBuilder('events');
        if(fixtureId){
            query.where('fixtureId = :fixtureId', { fixtureId })
        }
        // if(dateFrom){
        //     query.where('date', { dateFrom })
        // }
        // if(dateTo){
        //     query.where('date', { dateFrom })
        // }
        if(gameweek){
            query.where('gameweek = :gameweek', { gameweek })
        }
        if(playerId){
            query.where('playerId = :playerId', { playerId })
        }
        if(playerOptaId){
            query.where('playerOptaId = :playerOptaId', { playerOptaId })
        }
        return query.getMany();
    }
}
