import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { InstitutionService } from './institution.service.js';

@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Get()
  findAll() {
    return this.institutionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const institution = await this.institutionService.findOne(id);

    if (!institution) {
      throw new NotFoundException('Institution not found');
    }

    return institution;
  }
}
