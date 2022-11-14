import { ObjectType } from '@nestjs/graphql';

@ObjectType('SinatureResponse')
export class SinatureResponse {
  message: string;
  messageHash: string;
  signature: string
  v: string;
  r: string;
  s: string
}
