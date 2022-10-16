import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthModuleOptions } from '../auth.interface';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(AUTH_MODULE_OPTIONS) readonly options: AuthModuleOptions,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies.token ?? req.headers.authorization?.split(' ')[1] ?? req.query.access_token;
      },
      ignoreExpiration: false,
      secretOrKey: options.secret,
      passReqToCallback: true,
    });
  }

  validate = async (req: Request) => {
    const accessToken = req.cookies.token ?? req.headers.authorization?.split(' ')?.[1] ?? req.query.access_token;
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.authService.getUserByToken(accessToken);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  };
}
