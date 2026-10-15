import {
  Body,
  Controller,
  Get,
  Options,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CloneDocumentDto, PublishDocumentDto } from './metadata-documents.dto';
import type { document } from './metadata-documents.model';
import { MetadataDocumentsService } from './metadata-documents.service';

@Controller()
export class DocumentsController {
  constructor(private readonly documents: MetadataDocumentsService) {}

  @Options('documents')
  optionsDocuments(): string {
    return 'OK';
  }

  @Get('document/:id')
  getDocumentById(@Param('id') id: string): document {
    return this.documents.findById(id);
  }

  @Get('documents')
  getDocumentsByOwner(
@Query('owner_id') ownerId: string): document[] {
    return this.documents.findAllByOwner(ownerId);
  }

  @Post('document/clone')
  cloneDocument(@Body() payload: CloneDocumentDto): document {
    return this.documents.clone(payload);
  }

  @Post('document/publish')
  publishDocument(@Body() payload: PublishDocumentDto): document {
    return this.documents.publish(payload);
  }

  // @Post('document/save')
  // saveDocument(@Body() payload: SaveDocumentDto): document {
  //   return this.documents.save(payload);
  // }
}
