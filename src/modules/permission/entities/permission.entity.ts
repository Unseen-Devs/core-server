import { ObjectType } from '@nestjs/graphql';

@ObjectType('Permission', {
  description: 'Permission',
})
export class Permission {
  key: string;
  label?: string;
  group?: string;
  description?: string;
}
