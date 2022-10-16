import { ObjectType } from '@nestjs/graphql';
import { Member } from 'src/modules/users/entities/member.entity';
import { User } from 'src/modules/users/entities/users.entity';

@ObjectType({
  description: 'AdminAuthConnection',
})
export class AdminAuthConnection {
  accessToken: string;
  refreshToken: string;

  user: User;
}

@ObjectType({
  description: 'AuthConnection',
})
export class AuthConnection {
  accessToken: string;
  refreshToken: string;

  user: Member;
}
