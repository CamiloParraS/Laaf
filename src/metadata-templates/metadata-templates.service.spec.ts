import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TemplateMetadata } from './entities/template-metadata.entity';
import { MetadataTemplatesService } from './metadata-templates.service';

describe('MetadataTemplatesService', () => {
  let service: MetadataTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetadataTemplatesService,
        { provide: getRepositoryToken(TemplateMetadata), useValue: {} },
      ],
    }).compile();

    service = module.get<MetadataTemplatesService>(MetadataTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
