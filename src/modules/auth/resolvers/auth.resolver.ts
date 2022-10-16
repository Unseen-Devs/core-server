import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { Authenticated, CurrentUser } from 'src/decorators/common.decorator';
import { User } from 'src/modules/users/entities/users.entity';
import { AdminAuthConnection, AuthConnection } from '../entities/auth_connection.entity';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import type { JWTDecodeValue } from '../auth.interface';
import { LoginInput } from '../dto/login.input';
import { GraphQLContext } from 'src/graphql/app.graphql-context';
import { Member } from 'src/modules/users/entities/member.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @Authenticated()
  meAdmin(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => Member)
  @Authenticated()
  me(@CurrentUser() user: Member) {
    return user;
  }

  @Mutation(() => AuthConnection)
  async login(
    @Args('input', { type: () => LoginInput, nullable: false }) input: LoginInput,
    @Context() ctx: GraphQLContext,
  ) {
    const data = await this.authService.login(input.username, input.password);

    ctx.res.cookie('token', data.accessToken, {
      expires: dayjs(jwtDecode<JWTDecodeValue>(data.accessToken).exp * 1000).toDate(),
      sameSite: true,
      httpOnly: true,
    });
    // ctx.res.cookie('refreshToken', data.refreshToken, {
    //   expires: dayjs(jwtDecode<JWTDecodeValue>(data.refreshToken).exp * 1000).toDate(),
    //   sameSite: true,
    //   httpOnly: true,
    // });
    return data;
  }

  @Mutation(() => AdminAuthConnection)
  async loginAdmin(
    @Args('input', { type: () => LoginInput, nullable: false }) input: LoginInput,
    @Context() ctx: GraphQLContext,
  ) {
    const data = await this.authService.loginAdmin(input.username, input.password);

    ctx.res.cookie('token', data.accessToken, {
      expires: dayjs(jwtDecode<JWTDecodeValue>(data.accessToken).exp * 1000).toDate(),
      sameSite: true,
      httpOnly: true,
    });
    // ctx.res.cookie('refreshToken', data.refreshToken, {
    //   expires: dayjs(jwtDecode<JWTDecodeValue>(data.refreshToken).exp * 1000).toDate(),
    //   sameSite: false,
    //   httpOnly: true,
    // });
    return data;
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: GraphQLContext) {
    ctx.res.clearCookie('token');
    // ctx.res.clearCookie('refreshToken');
    return true;
  }
}
