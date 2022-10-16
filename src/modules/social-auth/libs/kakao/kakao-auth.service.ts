import axios from 'axios';
import { ApolloError } from 'apollo-server';

import { KAKAO_DOMAIN } from './kakao.constants';
import { KakaoUser } from './kakao.interface';
import { SocialUser } from '../../entities/social-auth.entity';

export class KakaoAuthService {
  // constructor() {}

  async getKakaoUser(accessToken: string): Promise<SocialUser> {
    try {
      const res = await axios.get<KakaoUser>(KAKAO_DOMAIN, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status !== 200) {
        throw new ApolloError('login_kakao_failure', 'login_social');
      }

      const {
        data: {
          id,
          kakao_account: { profile, email, ...account },
        },
      } = res;

      return {
        id,
        email,
        name: profile.nickname,
        ...account,
      };
    } catch (err) {
      console.log(err);
      throw new ApolloError('login_kakao_failure', 'login_social');
    }
  }
}
