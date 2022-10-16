import { MinLength, MaxLength, Validate } from 'class-validator';
import { Field, Int, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { UniqueEmail } from '../validators/UniqueEmail';

@InputType()
export class NewUserInput {
  @MinLength(3)
  @MaxLength(50)
  @Validate(UniqueEmail, {
    message: 'Email must be unique',
  })
  email: string;

  password: string;

  firstName?: string;

  lastName?: string;
  avatar?: string;
  isActive?: boolean;

  @Field(() => Int)
  age?: number;

  roles?: string[];
}

@InputType()
export class UpdateUserInput extends PartialType(OmitType(NewUserInput, ['email'])) {}
