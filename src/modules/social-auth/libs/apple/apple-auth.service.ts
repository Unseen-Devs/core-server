import AppleAuth from 'apple-auth';
import fs from 'fs';
import jwtDecode from 'jwt-decode';
import { ApolloError } from 'apollo-server';

import {
  APPLE_CLIENT_ID,
  APPLE_KEY_ID,
  APPLE_TEAM_ID,
  APPLE_PATH_KEY,
  APPLE_SCOPE,
  APPLE_REDIRECT_URI,
} from './apple.constants';
import { AppleUser } from './apple.interface';
import { SocialUser } from '../../entities/social-auth.entity';

export class AppleAuthService {
  // constructor() {}

  async getAppleUser(accessToken: string): Promise<SocialUser> {
    try {
      const auth = new AppleAuth(
        {
          client_id: APPLE_CLIENT_ID,
          team_id: APPLE_TEAM_ID,
          key_id: APPLE_KEY_ID,
          redirect_uri: APPLE_REDIRECT_URI,
          scope: APPLE_SCOPE,
        },
        fs.readFileSync(APPLE_PATH_KEY).toString(),
        'text',
      );

      const response = await auth.accessToken(accessToken);

      const idToken = jwtDecode<AppleUser>(response.id_token);

      if (!idToken || !idToken.sub || !idToken.email) {
        throw new ApolloError('login_apple_invalid_token', 'login_social');
      }

      return {
        id: idToken.sub,
        email: idToken.email,
      };
    } catch (err) {
      console.log(err);
      throw new ApolloError('login_apple_failure', 'login_apple_failure');
    }
  }
}
