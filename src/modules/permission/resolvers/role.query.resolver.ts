import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

import { PermissionService } from '../services/permission.service';
import { Role, RoleConnection } from '../entities/role.entity';
import { UserByRoleDataLoader } from '../dataloaders/user-by-role.dataloader';
import { User } from 'src/modules/users/entities/users.entity';
import { RoleDataLoader } from '../dataloaders/role.dataloader';
import { Allow } from 'src/decorators/common.decorator';
import { permissionKeys, PermissionType } from 'src/helpers/permissions';
import { PaginationArgs } from 'src/graphql/types/common.args';

@Resolver(() => Role)
export class RoleQueryResolver {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly userByRoleDataLoader: UserByRoleDataLoader,
    private readonly roleDataLoader: RoleDataLoader,
  ) {}

  @Query(() => RoleConnection, { nullable: true, description: 'Require `LIST_ROLE` permission' })
  @Allow('LIST_ROLE')
  async roles(@Args() args: PaginationArgs) {
    return this.permissionService.pagination(args);
  }

  @Query(() => Role, { nullable: true, description: 'Require `LIST_ROLE` permission' })
  @Allow('LIST_ROLE')
  async role(@Args('id') id: string) {
    return this.roleDataLoader.load(id);
  }

  @ResolveField(() => [User], {
    nullable: true,
  })
  async users(@Parent() role: Role) {
    return this.userByRoleDataLoader.load(role.id);
  }

  @ResolveField(() => [String], {
    nullable: true,
    name: 'roles',
  })
  async rolesField(@Parent() role: Role) {
    return role.roles?.filter((v) => permissionKeys.includes(v as PermissionType));
  }
}
