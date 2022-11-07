import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { ClubRepository } from '../repositories/club.repository';
import { ClubEntity } from '../entities/club.entity';
import { UserRepository } from '../../users/repositories/users.repository';

@Injectable()
export class ClubService {
  constructor(private readonly userRepository: UserRepository, private readonly clubRepository: ClubRepository) {}
}
