import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';
import type { Institution } from './institution.model';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutions: InstitutionsService) {}

  @Get('')
  getInstitutions(): Institution[] {
    return this.institutions.findAll();
  }

  @Get(':id')
  getInstitutionById(@Param('id') id: string): Institution {
    return this.institutions.findById(id);
  }

  @Post()
  createInstitution(
    @Body() institutionPayload: CreateInstitutionDto,
  ): Institution {
    return this.institutions.create(institutionPayload);
  }

  @Patch(':id')
  updateInstitution(
    @Param('id') id: string,
    @Body() institutionChanges: UpdateInstitutionDto,
  ): Institution {
    return this.institutions.update(id, institutionChanges);
  }
}
