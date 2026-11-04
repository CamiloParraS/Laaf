import { Test } from '@nestjs/testing';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';

describe('InstitutionsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [InstitutionsController],
      providers: [{ provide: InstitutionsService, useValue: {} }],
    }).compile();
    expect(module.get(InstitutionsController)).toBeDefined();
  });
});
