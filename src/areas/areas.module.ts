import { Module } from '@nestjs/common';
import { InstitutionsModule } from '../institutions/institutions.module';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
  imports: [InstitutionsModule],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [AreasService],
})
export class AreasModule {}
