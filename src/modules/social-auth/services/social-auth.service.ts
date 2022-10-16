import { ApolloError } from 'apollo-server';
import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/services/auth.service';
import { GoogleAuthService } from '../libs/google/google-auth.service';
import { AppleAuthService } from '../libs/apple/apple-auth.service';
import { KakaoAuthService } from '../libs/kakao/kakao-auth.service';
import { NaverAuthService } from '../libs/naver/naver-auth.service';
import { SocialUser } from '../entities/social-auth.entity';
import { SNSType } from '../utils/social-auth.enum';
import { MemberService } from 'src/modules/users/services/member.service';
import { Member } from 'src/modules/users/entities/member.entity';
import { getFacebookUser } from '../libs/facebook/facebook';

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly appleAuthService: AppleAuthService,
    private readonly kakaoAuthService: KakaoAuthService,
    private readonly naverAuthService: NaverAuthService,
  ) {}

  async loginBySocial(accessToken: string, provider: SNSType) {
    let socialUser: SocialUser = { id: '', email: '' };

    if (provider === SNSType.KAKAO) {
      socialUser = await this.kakaoAuthService.getKakaoUser(accessToken);
    } else if (provider === SNSType.NAVER) {
      socialUser = await this.naverAuthService.getNaverUser(accessToken);
    } else if (provider === SNSType.GOOGLE) {
      socialUser = await this.googleAuthService.getGGUser(accessToken);
    } else if (provider === SNSType.APPLE) {
      socialUser = await this.appleAuthService.getAppleUser(accessToken);
    } else if (provider === SNSType.FACEBOOK) {
      socialUser = await getFacebookUser(accessToken);
    }

    if (!socialUser.id || !socialUser.email) {
      throw new ApolloError('login_social_invalid', 'login_social');
    }

    return await this.authenticate({ ...socialUser, provider });
  }

  async authenticate(socialUser: SocialUser & { provider: SNSType }) {
    const { id, provider, email, first_name, last_name, avatar } = socialUser;
    let member: Member | undefined;
    try {
      member = await this.memberService.findOne({
        where: {
          provider,
          email: email,
        },
      });
    } catch (err) {
      member = await this.memberService.create({
        email,
        avatar: avatar ?? undefined,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        providerId: id,
        provider,
        isActive: true,
      });
    }

    if (!member) {
      throw new NotFoundException('User Not Found');
    }

    if (!member?.isActive) {
      throw new ApolloError('User Not Active', 'login_social', {
        user_not_active: 'user_not_active',
      });
    }

    const { password, passwordSalt, ...result } = member;

    try {
      const authToken = await this.authService.saveAuthToken(result.id, result.email, {
        issuer: 'frontend',
        audience: ['app'],
      });

      if (!authToken) {
        throw new ApolloError('Create token error', 'login_social', {
          user_not_create_token: 'user_not_create_token',
        });
      }

      return {
        user: result,
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      };
    } catch (err: any) {
      throw new ApolloError(err.message, 'login_social', {
        login_failure: 'login_failure',
      });
    }
  }
}
