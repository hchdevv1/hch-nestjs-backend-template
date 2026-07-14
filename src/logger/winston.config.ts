/* eslint-disable prettier/prettier */
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = {
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(
      'HCH Backend',
      {prettyPrint: true,},
    ),
  ),

  transports: [
    new winston.transports.Console(),
  ],
};
