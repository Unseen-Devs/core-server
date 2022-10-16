import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({ async: true, name: 'UniqueEmail' })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UsersService) {}
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    try {
      const user = await this.userService.findByEmail(value);
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
