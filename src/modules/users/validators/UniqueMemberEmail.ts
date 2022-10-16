import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MemberService } from '../services/member.service';

@ValidatorConstraint({ async: true, name: 'UniqueMemberEmail' })
@Injectable()
export class UniqueMemberEmail implements ValidatorConstraintInterface {
  constructor(protected readonly memberService: MemberService) {}
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    try {
      const user = await this.memberService.findByEmail(value);
      return !user;
    } catch (err) {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `User already exists!`;
  }
}
