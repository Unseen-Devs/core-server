import { Validate, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { UniqueMemberEmail } from '../validators/UniqueMemberEmail';

@Injectable()
@InputType()
export class RegisterInput {
  firstName: string;

  lastName: string;

  @MinLength(6)
  @Validate(UniqueMemberEmail, {
    message: 'Email must be unique',
  })
  email: string;

  password: string;
}
