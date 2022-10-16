import { Module, DynamicModule } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SOCIAL_AUTH_MODULE_OPTIONS } from './utils/social-auth.constants';
import { GoogleAuthService } from './libs/google/google-auth.service';
import { AppleAuthService } from './libs/apple/apple-auth.service';
import { KakaoAuthService } from './libs/kakao/kakao-auth.service';
import { NaverAuthService } from './libs/naver/naver-auth.service';
import { SocialAuthService } from './services/social-auth.service';
import { SocialAuthMutationResolver } from './resolvers/social-auth-mutation.resolver';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    // Service
    GoogleAuthService,
    AppleAuthService,
    KakaoAuthService,
    NaverAuthService,
    SocialAuthService,
    // Resolver
    SocialAuthMutationResolver,
  ],
  exports: [SocialAuthService],
})
export class SocialAuthModule {
  static forRoot(options?: 'SocialAuthModuleOptions'): DynamicModule {
    // if (!options?.secret) {
    //   throw new Error('JwtStrategy requires a secret or key');
    // }
    return {
      module: SocialAuthModule,
      providers: [
        {
          provide: SOCIAL_AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      imports: [],
    };
  }
}
