import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInstitutionDto, UpdateInstitutionDto } from './institution.dto';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private institutionsService: InstitutionsService) {}

  @Get('')
  getInstitutions() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  getInstitutionById(@Param('id') id: string) {
    return this.institutionsService.findById(id);
  }

  @Post()
  createInstitution(@Body() institutionPayload: CreateInstitutionDto) {
    return this.institutionsService.create(institutionPayload);
  }

  @Patch(':id')
  updateInstitution(
    @Param('id') id: string,
    @Body() institutionChanges: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(id, institutionChanges);
  }
}
