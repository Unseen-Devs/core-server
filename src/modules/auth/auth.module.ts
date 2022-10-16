import { Module, DynamicModule, Global } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthModuleOptions } from './auth.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repositories/auth.repository';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([AuthRepository])],
  providers: [AuthResolver],
})
export class AuthModule {
  static register(options?: AuthModuleOptions): DynamicModule {
    if (!options?.secret) {
      throw new Error('JwtStrategy requires a secret or key');
    }
    return {
      module: AuthModule,
      providers: [
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
        JwtStrategy,
        AuthService,
      ],
      imports: [
        JwtModule.register({
          secret: options?.secret,
          signOptions: { expiresIn: '30 days', issuer: 'frontend' },
        }),
      ],
      exports: [AuthService],
    };
  }
}
