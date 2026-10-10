import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Institution } from '../generated/prisma/client';

@Injectable()
export class InstitutionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Institution[]> {
    return this.prisma.institution.findMany();
  }

  findOne(id: string): Promise<Institution | null> {
    return this.prisma.institution.findUnique({
      where: { id },
    });
  }
}
