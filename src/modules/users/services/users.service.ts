import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, In, RemoveOptions, SaveOptions } from 'typeorm';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';
import bcrypt from 'bcryptjs';
import { PaginationArgs } from 'src/graphql/types/common.args';
import { UserInputError } from 'apollo-server-errors';
import { genNonce } from 'src/helpers/common';

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

  async loginWallet(walletAddress: string) {
    const user = await this.userRepository.findOne({
      where: { walletAddress: walletAddress.toLocaleLowerCase() },
    });

    if (!user) {
      let newUser: User | any = {
        walletAddress: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        nonce: 0,
      };
      newUser.nonce = genNonce();
      newUser.walletAddress = walletAddress.toLocaleLowerCase();

      const user = this.userRepository.create(newUser);
      return this.userRepository.save(user);
    }
    user.nonce = genNonce().toString();
    this.userRepository.save(user);
    return user;
  }
}
