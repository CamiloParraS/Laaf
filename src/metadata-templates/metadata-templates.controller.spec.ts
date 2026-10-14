import { Test, TestingModule } from '@nestjs/testing';
import { MetadataTemplatesController } from './metadata-templates.controller';
import { MetadataTemplatesService } from './metadata-templates.service';

describe('MetadataTemplatesController', () => {
  let controller: MetadataTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadataTemplatesController],
      providers: [MetadataTemplatesService],
    }).compile();

    controller = module.get<MetadataTemplatesController>(MetadataTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
