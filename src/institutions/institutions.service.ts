import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.institution.findMany();
  }

  async findById(id: string) {
    const data = await this.prisma.institution.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }

    return {
      message: 'Institución encontrada',
      data,
    };
  }

  async create(institutionPayload: CreateInstitutionDto) {
    try {
      const data = await this.prisma.institution.create({
        data: institutionPayload,
      });
      return { data };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Institución con nombre ${institutionPayload.name} ya existe`,
        );
      }
      throw error;
    }
  }

  async update(id: string, institutionChanges: UpdateInstitutionDto) {
    try {
      const data = await this.prisma.institution.update({
        where: { id },
        data: institutionChanges,
      });
      return {
        message: 'Institución actualizada con éxito',
        data,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Institución con ID ${id} no encontrada`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Institución con nombre ${institutionChanges.name} ya existe`,
          );
        }
      }
      throw error;
    }
  }
}
