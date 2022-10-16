import { google } from 'googleapis';

export const getGGUser = async (token: string) => {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2();
  oauth2Client.setCredentials({ access_token: token });
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });
  const res = await oauth2.userinfo.get();
  return res.data;
};
