import { beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { InstitutionsService } from './institutions.service';

describe('InstitutionsService', () => {
  let service: InstitutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionsService,
        {
          provide: getRepositoryToken(Institution),
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

    service = module.get<InstitutionsService>(InstitutionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
