import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { InstitutionsService } from '../institutions/institutions.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
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

  update(id: string, dto: UpdateAreaDto): Area {
    const position = this.areas.findIndex((area) => area.id === id);
    if (position === -1) {
      throw new NotFoundException(`Área con ID ${id} no encontrada`);
    }
    if (dto.institutionId !== undefined) {
      // Throws 404 if the institution does not exist.
      this.institutions.findById(dto.institutionId);
    }
    if (
      dto.name !== undefined &&
      this.areas.some((area) => area.name === dto.name && area.id !== id)
    ) {
      throw new ConflictException(`Área con nombre ${dto.name} ya existe`);
    }
    const updated = { ...this.areas[position], ...dto };
    this.areas[position] = updated;
    return updated;
  }
}
