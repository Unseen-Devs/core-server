import { InputType } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
@InputType()
export class ChangePasswordInput {
  currentPassword: string;

  newPassword: string;
  newPasswordConfirmation: string;
}

@Injectable()
@InputType()
export class ForgotPasswordInput {
  email: string;
}

@Injectable()
@InputType()
export class SetForgotPasswordInput {
  code: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

@Injectable()
@InputType()
export class UpdateMemberInfoInput {
  firstName?: string;
  lastName?: string;
  age?: number;
  avatar?: string;
}
