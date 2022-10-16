import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, In } from 'typeorm';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';
import bcrypt from 'bcryptjs';
import { PaginationArgs } from 'src/graphql/types/common.args';
import { UserInputError } from 'apollo-server-errors';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(option: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(option);
  }
  findByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  findActiveUser(email: string) {
    return this.userRepository.findOneOrFail({ where: { email, isActive: true } });
  }

  find(args: FindManyOptions<User>) {
    return this.userRepository.find(args);
  }

  findByIds(ids: string[]) {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  pagination(args: PaginationArgs) {
    let builder = this.userRepository.createQueryBuilder('users').select();
    if (args.s) {
      builder = builder
        .where('users.firstName ILIKE :searchQuery', { searchQuery: `%${args.s}%` })
        .orWhere('users.lastName ILIKE :searchQuery', { searchQuery: `%${args.s}%` });
    }

    builder = builder.orderBy('users.createdAt', 'DESC');
    return this.userRepository.paginateQueryBuilder(builder, args);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: username },
    });
    if (!user.isActive) {
      throw new UserInputError('User is not activate');
    }
    const check = bcrypt.compareSync(password, user.password);
    if (check) {
      return user;
    } else {
      return false;
    }
  }
}
