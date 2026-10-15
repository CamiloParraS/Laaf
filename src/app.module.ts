import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { MetadataTemplatesModule } from './metadata-templates/metadata-templates.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    AuthModule,
    InstitutionsModule,
    MetadataTemplatesModule,
  ],
})
export class AppModule {}
