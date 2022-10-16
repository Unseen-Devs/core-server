import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import type { Payload, JWTDecodeValue } from '../auth.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { ApolloError, UserInputError } from 'apollo-server';
import jwtDecode from 'jwt-decode';
import { AuthTokenEntity } from '../entities/auth.entity';
import { DeepPartial, FindOneOptions } from 'typeorm';
import { snowflake } from 'src/helpers/common';
import { MemberService } from 'src/modules/users/services/member.service';

type JwtGenerateOption = {
  audience?: string | string[];
  issuer?: string;
  jwtid?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async findOne(conditions: FindOneOptions<AuthTokenEntity>) {
    return await this.authRepository.findOne(conditions);
  }

  async validateAdminUser(username: string, pass: string) {
    const user = await this.usersService.login(username, pass);
    if (user) {
      const { password, passwordSalt, ...result } = user;
      return result;
    } else {
      throw new Error('User not found');
    }
  }

  async validateUser(username: string, pass: string) {
    const user = await this.memberService.login(username, pass);
    if (user) {
      const { password, passwordSalt, ...result } = user;
      return result;
    } else {
      throw new Error('User not found');
    }
  }

  async loginAdmin(username: string, password: string) {
    const user = await this.validateAdminUser(username, password);
    if (!user) {
      throw new ApolloError('Error');
    }
    if (!user.isActive) {
      throw new UserInputError('User not active');
    }
    try {
      const authToken = await this.saveAuthToken(user.id, user.email, {
        issuer: 'admin',
        audience: ['app'],
      });
      if (!authToken) {
        throw new ApolloError('Error');
      }
      return {
        user,
        accessToken: authToken?.accessToken,
        refreshToken: authToken?.refreshToken,
      };
    } catch (err) {
      throw new ApolloError('Error');
    }
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new ApolloError('Error');
    }
    if (!user.isActive) {
      throw new UserInputError('User not active');
    }
    try {
      const authToken = await this.saveAuthToken(user.id, user.email, {
        issuer: 'frontend',
        audience: ['app'],
      });
      if (!authToken) {
        throw new ApolloError('Error');
      }
      return {
        user,
        accessToken: authToken?.accessToken,
        refreshToken: authToken?.refreshToken,
      };
    } catch (err) {
      throw new ApolloError('Error');
    }
  }

  initAccessToken(data: { payload: Payload; options?: JwtGenerateOption }) {
    const { payload, options } = data;
    return {
      accessToken: this.jwtService.sign(payload, {
        ...options,
        expiresIn: `30 days`,
      }),
      refreshToken: this.jwtService.sign(payload, {
        ...options,
        expiresIn: `35 days`,
      }),
    };
  }

  async saveAuthToken(userId: string, username: string, options?: JwtGenerateOption) {
    const { accessToken, refreshToken } = this.initAccessToken({
      payload: {
        sub: userId,
        username,
      },
      options,
    });
    return { accessToken, refreshToken };
    // return await this.createToken({
    //   userId,
    //   accessToken,
    //   refreshToken,
    // });
  }

  async createToken(data: DeepPartial<AuthTokenEntity>) {
    const authToken = this.authRepository.create({ id: snowflake.nextId(), ...data });
    const newAuthToken = await this.authRepository.save(authToken);
    return await this.authRepository.findOne({
      where: {
        id: newAuthToken.id,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const currentPayload: Payload = await this.jwtService.verifyAsync(refreshToken, {
        ignoreExpiration: false,
      });
      const token = await this.authRepository.findOne({ where: { refreshToken } });
      if (!token) {
        throw new ApolloError('invalid_token');
      }
      const decoded = jwtDecode<JWTDecodeValue>(token.accessToken);
      const decodedRefreshToken = jwtDecode<JWTDecodeValue>(token.refreshToken);
      const payload: Payload = {
        username: currentPayload.username,
        sub: currentPayload.sub,
      };
      const refreshPayload: Payload = {
        username: currentPayload.username,
        sub: currentPayload.sub,
      };
      token.accessToken = this.jwtService.sign(payload, {
        expiresIn: `30 days`,
        issuer: decoded.iss,
        audience: decoded.aud,
      });
      token.refreshToken = this.jwtService.sign(refreshPayload, {
        expiresIn: `35 days`,
        issuer: decodedRefreshToken.iss,
        audience: decodedRefreshToken.aud,
      });
      const newToken = await this.updateToken(token);
      const user = this.usersService.findByEmail(currentPayload.username);
      if (newToken) {
        return {
          user,
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken,
        };
      }
    } catch (error) {
      throw new ApolloError('invalid_token');
    }
  }

  async updateToken(data: Partial<AuthTokenEntity>) {
    if (data.id) {
      delete data.updatedAt;
      await this.authRepository.update(data.id, data);
      return await this.authRepository.findOne({
        where: { id: data.id },
      });
    }
  }

  getUserByToken(token: string) {
    const decode = jwtDecode<JWTDecodeValue>(token);
    if (decode.iss === 'admin') {
      return this.usersService.findActiveUser(decode.username);
    } else {
      return this.memberService.findActiveUser(decode.username);
    }
  }
}
