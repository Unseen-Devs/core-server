import { Resolver, Args, Query, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User, UserConnection } from '../entities/users.entity';
import { Allow, AllowAny } from 'src/decorators/common.decorator';
import { PaginationArgs } from 'src/graphql/types/common.args';
import { NewUserInput, NewUserWalletInput } from '../dto/new_user.input';

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

  @Mutation(() => User, {
    description: 'Create user by wallet address',
    nullable: true
  })
  createUser(@Args('input') input: NewUserWalletInput) {
    return this.userService.loginWallet(input.walletAddress);
  }

}
