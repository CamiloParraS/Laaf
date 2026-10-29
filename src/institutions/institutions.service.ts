import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';
import { Institution } from './entities/institution.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionsRepository: Repository<Institution>,
  ) {}

  findAll(): Promise<Institution[]> {
    return this.institutionsRepository.find({ order: { name: 'ASC' } });
  }

  async findById(id: string): Promise<Institution> {
    const found = await this.institutionsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }
    return found;
  }

  async create(dto: CreateInstitutionDto): Promise<Institution> {
    try {
      return await this.institutionsRepository.save(
        this.institutionsRepository.create({ name: dto.name }),
      );
    } catch (error) {
      if (error instanceof QueryFailedError && isUniqueViolation(error)) {
        throw new ConflictException(
          `Institución con nombre ${dto.name} ya existe`,
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateInstitutionDto): Promise<Institution> {
    const institution = await this.findById(id);
    try {
      await this.institutionsRepository.update(institution.id, {
        name: dto.name,
      });
    } catch (error) {
      if (error instanceof QueryFailedError && isUniqueViolation(error)) {
        throw new ConflictException(
          `Institución con nombre ${dto.name} ya existe`,
        );
      }
      throw error;
    }
    return this.findById(id);
  }
}

const isUniqueViolation = (error: QueryFailedError): boolean =>
  (error as unknown as { code?: string }).code === '23505';
