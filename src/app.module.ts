import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from './areas/areas.module';
import { AuthModule } from './auth/auth.module';
import { Env } from './env.model';
import { InstitutionsModule } from './institutions/institutions.module';
import { MetadataDocumentsModule } from './metadata-documents/metadata-documents.module';
import { MetadataTemplatesModule } from './metadata-templates/metadata-templates.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: Number(configService.getOrThrow('POSTGRES_PORT')),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        autoLoadEntities: true,
        migrations: [join(__dirname, 'database', 'migrations', '*.{ts,js}')],
        migrationsRun: true,
      }),
    }),
    AuthModule,
    AreasModule,
    UsersModule,
    InstitutionsModule,
    MetadataTemplatesModule,
    MetadataDocumentsModule,
  ],
})
export class AppModule {}
