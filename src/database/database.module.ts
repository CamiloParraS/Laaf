import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from '../env/env.model';
import { dbOptions } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        ...dbOptions((key) => config.getOrThrow(key as keyof Env)),
        autoLoadEntities: true,
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
