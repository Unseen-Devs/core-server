import { MinLength, MaxLength } from 'class-validator';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class NewRoleInput {
  @MinLength(1)
  @MaxLength(500)
  name: string;

  roles?: string[];
}

@InputType()
export class EditRoleInput extends PartialType(NewRoleInput) {
  id: string;
}

@InputType()
export class AddUsersToRoleInput {
  userIds: string[];
  roleId: string;
}
