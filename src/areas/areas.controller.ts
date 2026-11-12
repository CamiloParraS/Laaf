import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAreaDto, UpdateAreaDto } from './areas.dto';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';

@Controller('area')
export class AreasController {
  constructor(private readonly areas: AreasService) {}

  @Get()
  getAreas(
    @Query('institution_id', ParseUUIDPipe) institutionId: string,
  ): Promise<Area[]> {
    return this.areas.findAllByInstitution(institutionId);
  }

  @Post()
  createArea(@Body() payload: CreateAreaDto): Promise<Area> {
    return this.areas.create(payload);
  }

  @Patch(':id')
  updateArea(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changes: UpdateAreaDto,
  ): Promise<Area> {
    return this.areas.update(id, changes);
  }
}
