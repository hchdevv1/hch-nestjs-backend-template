import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',

  port: Number(process.env.DB_PORT || 5432),

  username: process.env.DB_USERNAME || 'postgres',

  password: process.env.DB_PASSWORD || '',

  database: process.env.DB_DATABASE || 'postgres',

  ssl: (process.env.DB_SSL || 'false').toLowerCase() === 'true',

  synchronize:
  (process.env.DB_SYNCHRONIZE || 'false').toLowerCase() === 'true',
  logging:
    (process.env.DB_LOGGING || 'false').toLowerCase() === 'true',

  autoLoadEntities:
    (process.env.DB_AUTO_LOAD_ENTITIES || 'true').toLowerCase() === 'true',

  retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS || 3),

  retryDelay: Number(process.env.DB_RETRY_DELAY || 3000),
}));
