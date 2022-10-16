import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { RegisterInput } from '../dto/register.input';
import { ActivateUserInput } from '../dto/activate-user.input';
import { Member } from '../entities/member.entity';
import { MemberService } from '../services/member.service';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  SetForgotPasswordInput,
  UpdateMemberInfoInput,
} from '../dto/member.input';
import { Authenticated, CurrentUser } from 'src/decorators/common.decorator';

@Resolver(() => Member)
export class MemberMutationResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  register(@Args('input') input: RegisterInput) {
    return this.memberService.register(input);
  }

  @Mutation(() => Boolean)
  activateUser(@Args('input') input: ActivateUserInput) {
    return this.memberService.activate(input.email, input.code);
  }

  @Mutation(() => Boolean)
  forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return this.memberService.requestForgotPassword(input.email);
  }

  @Mutation(() => Boolean)
  setForgotPassword(@Args('input') input: SetForgotPasswordInput) {
    return this.memberService.setForgotPassword(input.code, input.newPassword);
  }

  @Mutation(() => Member)
  @Authenticated()
  updateInfo(@Args('input') input: UpdateMemberInfoInput, @CurrentUser('id') id: string) {
    return this.memberService.updateInfo(id, input);
  }

  @Mutation(() => Boolean)
  @Authenticated()
  changePassword(@Args('input') input: ChangePasswordInput, @CurrentUser('id') id: string) {
    return this.memberService.changePassword(id, input.currentPassword, input.newPassword);
  }
}
