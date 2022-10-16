import axios from 'axios';
import { SocialUser } from '../../interfaces/social-auth.interface';
import { FacebookUser } from './facebook.interface';

const FB = axios.create({
  baseURL: 'https://graph.facebook.com/v10.0',
});

export const getFacebookUser = async (token: string): Promise<SocialUser> => {
  const res = await FB.get<FacebookUser>('me', {
    params: {
      access_token: token,
      fields: 'email,name,picture{url},first_name,last_name,id',
    },
  });
  return {
    id: res.data.id,
    email: res.data.email,
    first_name: res.data.first_name,
    last_name: res.data.last_name,
    name: res.data.name,
    avatar: res.data.picture?.data.url,
  };
};
