import { Test, TestingModule } from '@nestjs/testing';
import { MetadataTemplatesService } from './metadata-templates.service';

describe('MetadataTemplatesService', () => {
  let service: MetadataTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadataTemplatesService],
    }).compile();

    service = module.get<MetadataTemplatesService>(MetadataTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
