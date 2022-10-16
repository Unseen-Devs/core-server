import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { User } from '../entities/users.entity';
import { NewUserInput, UpdateUserInput } from '../dto/new_user.input';
import { Allow, CurrentUser } from 'src/decorators/common.decorator';
import { UserCRUDService } from '../services/user-crud.service';

@Resolver(() => User)
export class UsersMutationResolver {
  constructor(private readonly userCRUDService: UserCRUDService) {}

  @Mutation(() => User, {
    description: 'Require `CREATE_USER` permission',
  })
  @Allow('CREATE_USER')
  createUser(@Args('input') input: NewUserInput) {
    return this.userCRUDService.create(input);
  }

  @Mutation(() => User, {
    description: 'Require `UPDATE_USER` permission',
  })
  @Allow('UPDATE_USER')
  updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    return this.userCRUDService.update(id, input);
  }
}
