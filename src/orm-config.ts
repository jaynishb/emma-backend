import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

require('dotenv').config();

const options: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  logging: true,
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  migrations: [join(__dirname, '..', 'migration/schema/**/**{.ts,.js}')],
  cli: {
    migrationsDir: join(__dirname, '..', 'migration/schema'),
  },
};

export default options;
