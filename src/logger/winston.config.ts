/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as path from 'path';

import { ConfigService } from '@nestjs/config';
import { LoggerOptions, format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export function createWinstonConfig(
  configService: ConfigService,
): LoggerOptions {
  const logger = configService.get('logger');

  const logDir = path.join(process.cwd(), logger.directory);

  return {
    level: logger.level,

    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),

      format.errors({
        stack: true,
      }),

      format.ms(),

      nestWinstonModuleUtilities.format.nestLike(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        logger.appName,
        {
          prettyPrint: true,
        },
      ),
    ),

    transports: [
      new transports.Console(),

      new DailyRotateFile({
        dirname: logDir,

        filename: 'application-%DATE%.log',

        datePattern: 'YYYY-MM-DD',

        zippedArchive: logger.zippedArchive,

        maxSize: logger.maxSize,

        maxFiles: logger.retention,

        level: logger.level,
      }),

      new DailyRotateFile({
        dirname: logDir,

        filename: 'error-%DATE%.log',

        datePattern: 'YYYY-MM-DD',

        zippedArchive: logger.zippedArchive,

        maxSize: logger.maxSize,

        maxFiles: logger.retention,

        level: 'error',
      }),
    ],
  };
}
