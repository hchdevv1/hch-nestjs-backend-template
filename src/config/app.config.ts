import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'HCH NestJS Backend Template',
  env: process.env.APP_ENV || 'development',
  host: process.env.APP_HOST || '0.0.0.0',
  port: Number(process.env.APP_PORT || 3000),
}));
