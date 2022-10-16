import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/users.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UserDataLoader } from './dataloaders/users.dataloader';
import { UsersMutationResolver } from './resolvers/users.mutation.resolver';
import { RoleByUserDataLoader } from './dataloaders/role-by-user.dataloader';
import { PermissionByUserDataLoader } from './dataloaders/permission-by-user.dataloader';
import { UniqueEmail } from './validators/UniqueEmail';
import { ActivateCode } from './entities/activate-code.entity';
import { ActivateCodeRepository } from './repositories/activate-code.repository';
import { UserModuleOptions, USER_MODULE_OPTIONS } from './users.constants';
import { Member } from './entities/member.entity';
import { MemberRepository } from './repositories/member.repository';
import { MemberMutationResolver } from './resolvers/member.mutation.resolver';
import { UniqueMemberEmail } from './validators/UniqueMemberEmail';
import { MemberService } from './services/member.service';
import { MemberFieldsResolver } from './resolvers/member.fields.resolver';
import { UserCRUDService } from './services/user-crud.service';
import { PermissionModule } from '../permission/permission.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, ActivateCode, UserRepository, ActivateCodeRepository, Member, MemberRepository]),
    PermissionModule,
  ],
  providers: [
    UserDataLoader,
    UsersService,
    UserCRUDService,
    UsersResolver,
    UsersMutationResolver,
    MemberMutationResolver,
    MemberFieldsResolver,
    RoleByUserDataLoader,
    PermissionByUserDataLoader,
    UniqueEmail,
  ],
  exports: [UsersService, UserCRUDService, UserDataLoader, RoleByUserDataLoader, UniqueEmail],
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
        MemberService,
        UniqueMemberEmail,
      ],
      exports: [MemberService, UniqueMemberEmail],
    };
  }
}
