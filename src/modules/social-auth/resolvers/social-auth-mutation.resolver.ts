import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';

import { GraphQLContext } from 'src/graphql/app.graphql-context';
import { JWTDecodeValue } from 'src/modules/auth/auth.interface';
import { AuthConnectionUnion } from '../entities/social-auth-connection.entity';
import { SocialAuthService } from '../services/social-auth.service';
import { SNSLoginInput } from '../dto/social-login-input.dto';
import { AuthConnection } from 'src/modules/auth/entities/auth_connection.entity';

@Resolver()
export class SocialAuthMutationResolver {
  constructor(private readonly socialAuthService: SocialAuthService) {}

  @Mutation(() => AuthConnection)
  async loginBySocial(@Args('input') input: SNSLoginInput, @Context() ctx: GraphQLContext) {
    const { snsToken, snsType } = input;
    const data = await this.socialAuthService.loginBySocial(snsToken, snsType);

    if (data.accessToken) {
      ctx.res.cookie('token', data.accessToken, {
        expires: dayjs(jwtDecode<JWTDecodeValue>(data.accessToken).exp * 1000).toDate(),
        sameSite: false,
        httpOnly: true,
      });
    }
    if (data.refreshToken) {
      ctx.res.cookie('refreshToken', data.refreshToken, {
        expires: dayjs(jwtDecode<JWTDecodeValue>(data.refreshToken).exp * 1000).toDate(),
        sameSite: false,
        httpOnly: true,
      });
    }

    return data;
  }
}
