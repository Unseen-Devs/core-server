import { Validate, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
@InputType()
export class ActivateUserInput {
  email: string;

  code: string;
}
