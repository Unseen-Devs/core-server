import { registerEnumType } from '@nestjs/graphql';

export enum SNSType {
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}
registerEnumType(SNSType, {
  name: 'SNSType',
});
