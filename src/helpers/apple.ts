import axios from 'axios';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { ApolloError } from 'apollo-server-errors';
import { NotFoundException } from '@nestjs/common';

const request = axios.create({
  baseURL: 'https://appleid.apple.com',
});

const generateSecret = () => {
  if (!process.env.APPLE_KEY_PATH || !process.env.APPLE_CLIENT_ID || !process.env.APPLE_KEY_ID) return undefined;
  if (!fs.existsSync(process.env.APPLE_KEY_PATH)) {
    throw new NotFoundException('Apple Key Path not exists.');
  }
  return new Promise<string | undefined>((resolve, reject) => {
    const exp = Math.floor(Date.now() / 1000) + 86400 * 180; // Make it expire within 6 months

    const privateKey = fs.readFileSync(process.env.APPLE_KEY_PATH!, { encoding: 'utf8' });
    const claims = {
      iss: process.env.APPLE_TEAM_ID,
      iat: Math.floor(Date.now() / 1000),
      exp,
      aud: 'https://appleid.apple.com',
      sub: process.env.APPLE_CLIENT_ID,
    };
    // Sign the claims using the private key
    jwt.sign(
      claims,
      privateKey,
      {
        algorithm: 'ES256',
        keyid: process.env.APPLE_KEY_ID,
      },
      (err, token) => {
        if (err) {
          reject('AppleAuth Error – Error occurred while signing: ' + err);
          return;
        }
        resolve(token);
      },
    );
  });
};

export const getAppleUser = async (token: string) => {
  const secret = await generateSecret();
  if (!secret) {
    throw new ApolloError('create_secret_error', 'create_secret_error');
  }
  const res = await request.post<{ id_token: string }>('auth/token', {
    grant_type: 'authorization_code',
    code: token,
    redirect_uri: process.env.APPLE_REDIRECT_URI,
    client_id: process.env.APPLE_CLIENT_ID,
    client_secret: secret,
  });
  const idToken: any = jwt.decode(res.data.id_token);
  if (idToken && typeof idToken === 'object') {
    const user: { sub: string; email: string } = {
      sub: idToken.sub ? idToken.sub : '',
      email: idToken?.email,
    };
    return user;
  } else {
    throw new ApolloError('invalid_token', 'invalid_token');
  }
};
