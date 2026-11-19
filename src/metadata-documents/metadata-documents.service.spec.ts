
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentMetadata } from './entities/document-metadata.entity';
import { MetadataDocumentsService } from './metadata-documents.service';

describe('MetadataDocumentsService', () => {
  let service: MetadataDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetadataDocumentsService,
        {
          provide: getRepositoryToken(DocumentMetadata),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MetadataDocumentsService>(MetadataDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
