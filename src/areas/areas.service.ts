import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { InstitutionsService } from '../institutions/institutions.service';
import { CreateAreaDto } from './area.dto';
import { Area } from './area.model';

@Injectable()
export class AreasService {
  // POC: in-memory, lost on restart. Replace with Prisma later.
  private areas: Area[] = [];

  constructor(private readonly institutions: InstitutionsService) {}

  create(dto: CreateAreaDto): Area {
    // Throws 404 if the institution does not exist.
    this.institutions.findById(dto.institutionId);

    if (this.areas.some((area) => area.name === dto.name)) {
      throw new ConflictException(`Área con nombre ${dto.name} ya existe`);
    }
    const area: Area = {
      id: randomUUID(),
      name: dto.name,
      institutionId: dto.institutionId,
      areaLeaderId: dto.areaLeaderId ?? null,
    };
    this.areas.push(area);
    return area;
  }
}
