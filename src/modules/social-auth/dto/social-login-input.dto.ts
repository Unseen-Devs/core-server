import { InputType, Field } from '@nestjs/graphql';

import { SNSType } from '../utils/social-auth.enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SNSLoginInput {
  @Field(() => String)
  snsToken: string;

  @Field(() => SNSType)
  @IsNotEmpty()
  snsType: SNSType;
}
