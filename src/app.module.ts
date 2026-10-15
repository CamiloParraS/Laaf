import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { InstitutionsModule } from './institutions/institutions.module';
import { MetadataDocumentsModule } from './metadata-documents/metadata-documents.module';
import { MetadataTemplatesController } from './metadata-templates/metadata-templates.controller';
import { MetadataTemplatesService } from './metadata-templates/metadata-templates.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstitutionsModule,
    MetadataDocumentsModule,
  ],
  controllers: [AppController, AuthController, MetadataTemplatesController],
  providers: [AppService, AuthService, MetadataTemplatesService],
})
export class AppModule {}
