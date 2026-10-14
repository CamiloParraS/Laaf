import { Body, Controller, Post } from '@nestjs/common';
import { CreateAreaDto } from './area.dto';
import type { Area } from './area.model';
import { AreasService } from './areas.service';

@Controller('area')
export class AreasController {
  constructor(private readonly areas: AreasService) {}

  @Post()
  createArea(@Body() areaPayload: CreateAreaDto): Area {
    return this.areas.create(areaPayload);
  }
}
