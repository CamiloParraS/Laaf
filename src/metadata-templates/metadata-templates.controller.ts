import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { MetadataTemplatesService } from './metadata-templates.service';
import { UpdateMetadataTemplateDto } from './metadata-templates.dto';
import type {
  MetadataTemplatePage,
  MetadataTemplateResponse,
} from './metadata-templates.dto';

@Controller('metadata-templates')
export class MetadataTemplatesController {
  constructor(private readonly templates: MetadataTemplatesService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): MetadataTemplatePage {
    return this.templates.findAll(Math.max(page, 1), Math.min(Math.max(limit, 1), 100));
  }

  @Get(':id')
  findById(@Param('id') id: string): MetadataTemplateResponse {
    return this.templates.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateMetadataTemplateDto,
  ): MetadataTemplateResponse {
    return this.templates.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.templates.remove(id);
  }
}
