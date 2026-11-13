import { beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';

describe('AreasService', () => {
  let service: AreasService;
  const areas = {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn((v) => v),
    save: vi.fn((v) => Promise.resolve(v)),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        AreasService,
        { provide: getRepositoryToken(Area), useValue: areas },
      ],
    }).compile();
    service = module.get(AreasService);
  });

  it('create saves the area', async () => {
    const result = await service.create({
      name: 'Math',
      institutionId: 'i1',
      leaderId: 'u1',
    });
    expect(result).toMatchObject({
      name: 'Math',
      institutionId: 'i1',
      leaderId: 'u1',
    });
  });

  it('update changes the name', async () => {
    areas.findOne.mockResolvedValue({ id: 'a1', name: 'Old' });
    const result = await service.update('a1', { name: 'New' });
    expect(result.name).toBe('New');
  });

  it('findById throws when missing', async () => {
    areas.findOne.mockResolvedValue(null);
    await expect(service.findById('x')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('findAllByInstitution filters by institution', async () => {
    areas.find.mockResolvedValue([]);
    await service.findAllByInstitution('i1');
    expect(areas.find).toHaveBeenCalledWith({
      where: { institutionId: 'i1' },
      order: { name: 'ASC' },
    });
  });
});
