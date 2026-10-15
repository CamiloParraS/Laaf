import { Module } from '@nestjs/common';
import { MetadataTemplatesController } from './metadata-templates.controller';
import { MetadataTemplatesService } from './metadata-templates.service';

@Module({
  controllers: [MetadataTemplatesController],
  providers: [MetadataTemplatesService],
})
export class MetadataTemplatesModule {}
