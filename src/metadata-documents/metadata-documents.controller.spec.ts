import { Test } from '@nestjs/testing';
import { DocumentsController } from './metadata-documents.controller';
import { MetadataDocumentsService } from './metadata-documents.service';

describe('DocumentsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [{ provide: MetadataDocumentsService, useValue: {} }],
    }).compile();
    expect(module.get(DocumentsController)).toBeDefined();
  });
});
