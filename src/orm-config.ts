import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const getDatabaseUrl = async () => {
  let url = process.env.DATABASE_URL;
  const username = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  url = `postgres://${username}:${password}@${url}`;

  return url;
};


const options = async (): Promise<PostgresConnectionOptions> => {
  const databaseUrl = await getDatabaseUrl();

  return {
    type: 'postgres',
    url: databaseUrl,
    ssl: false,
    entities: [join(__dirname, '**/**/**.entity{.ts,.js}')],
    logging: true,
    synchronize: true,
    dropSchema: false,
    migrationsRun: false,
  };
};

export = options();
