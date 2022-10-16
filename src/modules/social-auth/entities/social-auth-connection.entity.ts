import { createUnionType, ObjectType } from '@nestjs/graphql';

import { AuthConnection } from 'src/modules/auth/entities/auth_connection.entity';
import { SNSType } from '../utils/social-auth.enum';
import { SocialUser } from '../interfaces/social-auth.interface';

@ObjectType({
  description: 'SocialAuthConnection',
})
export class SocialAuthConnection implements SocialUser {
  id: string;
  provider: SNSType;
  email: string;
  phone_number?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
}

export const AuthConnectionUnion = createUnionType({
  name: 'AuthConnectionUnion',
  types: () => [SocialAuthConnection, AuthConnection],
  resolveType: (value) => {
    if ('user' in value) {
      return AuthConnection;
    }

    return SocialAuthConnection;
  },
});
