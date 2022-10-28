import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User, UserConnection } from '../entities/users.entity';
import { AllowAny } from 'src/decorators/common.decorator';
import { PaginationArgs } from 'src/graphql/types/common.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService
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
}
