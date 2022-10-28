import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/users.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UserDataLoader } from './dataloaders/users.dataloader';
import { UniqueEmail } from './validators/UniqueEmail';
import { UserModuleOptions, USER_MODULE_OPTIONS } from './users.constants';

import { PermissionModule } from '../permission/permission.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User,  UserRepository])
  ],
  providers: [
    UserDataLoader,
    UsersService,
    UsersResolver,
    UniqueEmail,
  ],
  exports: [UsersService, UserDataLoader, UniqueEmail],
})
export class UsersModule {
  static register(options?: UserModuleOptions): DynamicModule {
    return {
      module: UsersModule,
      providers: [
        {
          provide: USER_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
