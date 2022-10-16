import axios from 'axios';

const FB = axios.create({
  baseURL: 'https://graph.facebook.com/v10.0',
});

export const getFacebookUser = async (token: string) => {
  const res = await FB.get<{
    name?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    picture?: {
      data: {
        url: string;
      };
    };
  }>('me', {
    params: {
      access_token: token,
      fields: 'email,picture{url},first_name,last_name,id',
    },
  });
  return res.data;
};
