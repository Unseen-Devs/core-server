import { Validate, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
@InputType()
export class LoginInput {
  @MinLength(1)
  username: string;

  password: string;
}
