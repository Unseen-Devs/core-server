import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User, UserConnection } from '../entities/users.entity';
import { RoleByUserDataLoader } from '../dataloaders/role-by-user.dataloader';
import { AllowAny } from 'src/decorators/common.decorator';
import { PaginationArgs } from 'src/graphql/types/common.args';
import { Role } from 'src/modules/permission/entities/role.entity';
import { onlyUniqueString } from 'src/helpers/common';
import { permissionKeys, PermissionType } from 'src/helpers/permissions';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly roleByUserDataLoader: RoleByUserDataLoader,
  ) {}

  @Query(() => UserConnection, {
    name: 'users',
    nullable: true,
    description: 'Require `LIST_USER` permission',
  })
  @AllowAny('LIST_USER')
  users(@Args() args: PaginationArgs) {
    return this.userService.pagination(args);
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  fullName(@Parent() user: User): string {
    return `${user.firstName} ${user.lastName ?? ''}`;
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  avatar(@Parent() user: User): string {
    return user.avatar ?? 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg';
  }

  @ResolveField(() => [Role], {
    nullable: true,
  })
  roles(@Parent() user: User): Promise<Role[]> {
    return this.roleByUserDataLoader.load(user.id);
  }

  @ResolveField(() => [String], {
    nullable: true,
  })
  async permissions(@Parent() user: User): Promise<string[]> {
    const roles = await this.roleByUserDataLoader.load(user.id).then((p) =>
      p
        .reduce<string[]>((acc, curr) => {
          return acc.concat(curr.roles ?? []);
        }, [])
        .filter(onlyUniqueString),
    );
    return roles.filter((v) => permissionKeys.includes(v as PermissionType));
  }
}
