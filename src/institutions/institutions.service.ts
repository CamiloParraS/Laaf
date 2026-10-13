import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';
import { Institution } from './institution.model';

@Injectable()
export class InstitutionsService {
  // POC: in-memory, lost on restart. Replace with Prisma later.
  private institutions: Institution[] = [];

  findAll(): Institution[] {
    return this.institutions;
  }

  findById(id: string): Institution {
    const data = this.institutions.find((institution) => institution.id === id);
    if (data === undefined) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }
    return data;
  }

  create(dto: CreateInstitutionDto): Institution {
    if (
      this.institutions.some((institution) => institution.name === dto.name)
    ) {
      throw new ConflictException(
        `Institución con nombre ${dto.name} ya existe`,
      );
    }
    const institution: Institution = {
      id: randomUUID(),
      name: dto.name,
    };
    this.institutions.push(institution);
    return institution;
  }

  update(id: string, dto: UpdateInstitutionDto): Institution {
    const position = this.institutions.findIndex(
      (institution) => institution.id === id,
    );
    if (position === -1) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }
    if (
      dto.name !== undefined &&
      this.institutions.some(
        (institution) => institution.name === dto.name && institution.id !== id,
      )
    ) {
      throw new ConflictException(
        `Institución con nombre ${dto.name} ya existe`,
      );
    }
    const updated = { ...this.institutions[position], ...dto };
    this.institutions[position] = updated;
    return updated;
  }
}
