import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './metadata-documents.controller';
import { MetadataDocumentsService } from './metadata-documents.service';
import { DocumentMetadata } from './entities/document-metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentMetadata])],
  controllers: [DocumentsController],
  providers: [MetadataDocumentsService],
  exports: [MetadataDocumentsService],
})
export class MetadataDocumentsModule {}
