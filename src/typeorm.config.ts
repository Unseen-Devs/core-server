import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Opta } from './modules/opta/entities/opta.entity';
import { PlayerEntity } from './modules/player/entities/player.entity';
import { RewardEntity } from './modules/reward/entities/reward.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  // type: 'postgres',
  // port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  type: 'mysql',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  entities: [Opta, PlayerEntity, RewardEntity],
  logging: process.env.DATABASE_LOGGING === 'true',
  // useUTC: true,
};
