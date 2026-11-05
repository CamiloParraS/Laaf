import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';
import { Institution } from './entities/institution.entity';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutions: InstitutionsService) {}

  @Get()
  getInstitutions(): Promise<Institution[]> {
    return this.institutions.findAll();
  }

  @Get(':id')
  getInstitutionById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Institution> {
    return this.institutions.findById(id);
  }

  @Post()
  createInstitution(
    @Body() institutionPayload: CreateInstitutionDto,
  ): Promise<Institution> {
    return this.institutions.create(institutionPayload);
  }

  @Patch(':id')
  updateInstitution(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() institutionChanges: UpdateInstitutionDto,
  ): Promise<Institution> {
    return this.institutions.update(id, institutionChanges);
  }
}
