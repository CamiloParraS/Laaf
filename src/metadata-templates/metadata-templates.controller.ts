import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MetadataTemplatesService } from './metadata-templates.service';
import { CreateMetadataTemplateDto } from './dto/create-metadata-template.dto';
import type { MetadataTemplatePage } from './dto/metadata-template-page.dto';
import { UpdateMetadataTemplateDto } from './dto/update-metadata-template.dto';
import { TemplateMetadata } from './entities/template-metadata.entity';

@Controller('metadata-templates')
export class MetadataTemplatesController {
  constructor(private readonly templates: MetadataTemplatesService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<MetadataTemplatePage> {
    return this.templates.findAll(Math.max(page, 1), Math.min(Math.max(limit, 1), 100));
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<TemplateMetadata> {
    return this.templates.findById(id);
  }

  @Post()
  create(@Body() payload: CreateMetadataTemplateDto): Promise<TemplateMetadata> {
    return this.templates.create(payload);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMetadataTemplateDto,
  ): Promise<TemplateMetadata> {
    return this.templates.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.templates.remove(id);
  }
}
