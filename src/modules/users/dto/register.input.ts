import { Validate, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
@InputType()
export class RegisterInput {
  firstName: string;

  lastName: string;

  @MinLength(6)
  email: string;

  password: string;
}
