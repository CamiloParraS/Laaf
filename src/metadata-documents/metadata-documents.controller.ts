import {
  Body,
  Controller,
  Get,
  Options,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CloneDocumentDto,
  PublishDocumentDto,
  SaveDocumentDto,
} from './metadata-documents.dto';
import { DocumentMetadata } from './entities/document-metadata.entity';
import { MetadataDocumentsService } from './metadata-documents.service';

@Controller()
export class DocumentsController {
  constructor(private readonly documents: MetadataDocumentsService) {}

  @Options('documents')
  optionsDocuments(): string {
    return 'Doro was Here, doro or something';
  }

  @Get('document/:id')
  getDocumentById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DocumentMetadata> {
    return this.documents.findById(id);
  }

  @Get('documents')
  getDocumentsByOwner(
    @Query('owner_id', ParseUUIDPipe) ownerId: string,
  ): Promise<DocumentMetadata[]> {
    return this.documents.findAllByOwner(ownerId);
  }

  @Post('document/clone')
  cloneDocument(@Body() payload: CloneDocumentDto): Promise<DocumentMetadata> {
    return this.documents.clone(payload);
  }

  @Post('document/publish')
  publishDocument(
    @Body() payload: PublishDocumentDto,
  ): Promise<DocumentMetadata> {
    return this.documents.publish(payload);
  }

  @Put('document/:id')
  saveDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: SaveDocumentDto,
  ): Promise<DocumentMetadata> {
    return this.documents.save(id, payload);
  }
}
