import { ObjectType } from '@nestjs/graphql';

import { SocialUser as SocialUserInterface } from '../interfaces/social-auth.interface';

@ObjectType({
  description: 'SocialUser',
})
export class SocialUser implements SocialUserInterface {
  id: string;
  email: string;
  phone_number?: string | null;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  avatar?: string | null;
}
