import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Member } from '../entities/member.entity';

@Resolver(() => Member)
export class MemberFieldsResolver {
  @ResolveField(() => String, {
    nullable: true,
  })
  fullName(@Parent() user: Member): string {
    return `${user.firstName} ${user.lastName ?? ''}`;
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  avatar(@Parent() user: Member): string {
    return user.avatar ?? 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg';
  }
}
