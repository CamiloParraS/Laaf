import { Module } from '@nestjs/common';
import { DocumentsController } from './metadata-documents.controller';
import { MetadataDocumentsService } from './metadata-documents.service';

@Module({
  controllers: [DocumentsController],
  providers: [MetadataDocumentsService],
})
export class MetadataDocumentsModule {}
