import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataTemplatesController } from './metadata-templates.controller';
import { MetadataTemplatesService } from './metadata-templates.service';
import { TemplateMetadata } from './entities/template-metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateMetadata])],
  controllers: [MetadataTemplatesController],
  providers: [MetadataTemplatesService],
  exports: [MetadataTemplatesService],
})
export class MetadataTemplatesModule {}
