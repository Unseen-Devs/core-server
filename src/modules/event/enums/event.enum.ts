import { registerEnumType } from '@nestjs/graphql';
export enum EventTypeEnum {
  ASSITS = 'ASSITS',
  GOAL = 'GOAL',
}

registerEnumType(EventTypeEnum, {
  name: 'EventType',
});
