import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { PermissionService } from '../services/permission.service';
import { Role } from '../entities/role.entity';
import { AddUsersToRoleInput, EditRoleInput, NewRoleInput } from '../dto/new_role.input';
import { Allow } from 'src/decorators/common.decorator';

@Resolver(() => Role)
export class RoleMutationResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => Role, {
    description: 'Require `CREATE_ROLE` permission',
  })
  @Allow('CREATE_ROLE')
  createRole(@Args('input') input: NewRoleInput) {
    return this.permissionService.create(input);
  }

  @Mutation(() => Role, {
    description: 'Require `UPDATE_ROLE` permission',
  })
  @Allow('UPDATE_ROLE')
  updateRole(@Args('input') { id, ...rest }: EditRoleInput) {
    return this.permissionService.update(id, rest);
  }

  @Mutation(() => Boolean, {
    description: 'Require `DELETE_ROLE` permission',
  })
  @Allow('DELETE_ROLE')
  deleteRole(@Args('id') id: string) {
    return this.permissionService.remove(id);
  }

  @Mutation(() => Role, {
    description: 'Require `UPDATE_ROLE` permission',
  })
  @Allow('UPDATE_ROLE')
  async addUsersToRole(@Args('input') input: AddUsersToRoleInput) {
    try {
      const role = await this.permissionService.addUsersToRole(input.roleId, input.userIds);
      return role;
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => Role, {
    description: 'Require `UPDATE_ROLE` permission',
  })
  @Allow('UPDATE_ROLE')
  async removeUsersToRole(@Args('input') input: AddUsersToRoleInput) {
    try {
      const role = await this.permissionService.removeUsersToRole(input.roleId, input.userIds);
      return role;
    } catch (err) {
      throw err;
    }
  }
}
