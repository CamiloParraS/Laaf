import { Test } from '@nestjs/testing';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

describe('AreasController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [{ provide: AreasService, useValue: {} }],
    }).compile();
    expect(module.get(AreasController)).toBeDefined();
  });
});
