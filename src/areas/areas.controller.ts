import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
import type { Area } from './area.model';
import { AreasService } from './areas.service';

@Controller('area')
export class AreasController {
  constructor(private readonly areas: AreasService) {}

  @Post()
  createArea(@Body() areaPayload: CreateAreaDto): Area {
    return this.areas.create(areaPayload);
  }

  @Patch(':id')
  updateArea(
    @Param('id') id: string,
    @Body() areaChanges: UpdateAreaDto,
  ): Area {
    return this.areas.update(id, areaChanges);
  }
}
