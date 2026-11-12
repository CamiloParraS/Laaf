import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAreaDto, UpdateAreaDto } from './areas.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) {}

  findAllByInstitution(institutionId: string): Promise<Area[]> {
    return this.areasRepository.find({
      where: { institutionId },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Area> {
    const found = await this.areasRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Área con ID ${id} no encontrada`);
    return found;
  }

  create(dto: CreateAreaDto): Promise<Area> {
    return this.save(
      this.areasRepository.create({
        name: dto.name,
        institutionId: dto.institutionId,
        leaderId: dto.leaderId ?? null,
      }),
    );
  }

  async update(id: string, dto: UpdateAreaDto): Promise<Area> {
    const area = await this.findById(id);
    if (dto.name !== undefined) area.name = dto.name;
    if (dto.leaderId !== undefined) area.leaderId = dto.leaderId;
    return this.save(area);
  }

  private async save(area: Area): Promise<Area> {
    try {
      return await this.areasRepository.save(area);
    } catch (error) {
      if (error instanceof QueryFailedError && isUniqueViolation(error)) {
        throw new ConflictException(`Área con nombre ${area.name} ya existe`);
      }
      throw error;
    }
  }
}

const isUniqueViolation = (error: QueryFailedError): boolean =>
  (error as unknown as { code?: string }).code === '23505';
