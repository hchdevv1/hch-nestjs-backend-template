/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: configuration,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.get('database');

        return {
          type: database.type,
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,

          synchronize: database.synchronize,
          logging: database.logging,
          autoLoadEntities: database.autoLoadEntities,

          retryAttempts: database.retryAttempts,
          retryDelay: database.retryDelay,
        };
      },
    }),

    LoggerModule,

    
  ],
})
export class AppModule {}
