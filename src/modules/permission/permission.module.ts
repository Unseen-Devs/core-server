import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionService } from './services/permission.service';
import { RoleRepository } from './repositories/role.repository';
import { RoleQueryResolver } from './resolvers/role.query.resolver';
import { RoleMutationResolver } from './resolvers/role.mutation.resolver';
import { RoleDataLoader } from './dataloaders/role.dataloader';
import { PermissionQueryResolver } from './resolvers/permission.query.resolver';
import { UserByRoleDataLoader } from './dataloaders/user-by-role.dataloader';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleRepository])],
  providers: [
    PermissionService,
    RoleQueryResolver,
    RoleMutationResolver,
    PermissionQueryResolver,
    RoleDataLoader,
    UserByRoleDataLoader,
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
