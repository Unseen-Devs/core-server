import './dotenv-config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';

const migrationConfig: TypeOrmModuleOptions = {
  ...typeORMConfig,
  migrations: ['src/migration/**/*.ts'],
  // cli: {
  //   migrationsDir: 'src/migration',
  // },
};

export default migrationConfig;
