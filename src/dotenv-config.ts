import { existsSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envs = [`.env.${env}`, '.env'];

envs.map((file) => {
  const filePath = resolve(process.cwd(), file);
  if (existsSync(filePath)) {
    expand(config({ path: filePath }));
  }
});
