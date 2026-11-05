import { beforeEach, vi } from 'vitest';
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
            find: vi.fn(),
            findOne: vi.fn(),
            create: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
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
