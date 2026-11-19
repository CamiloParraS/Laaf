import { PickType } from '@nestjs/mapped-types';
import { CreateMetadataTemplateDto } from './create-metadata-template.dto';

export class UpdateMetadataTemplateDto extends PickType(
  CreateMetadataTemplateDto,
  ['name'],
) {}
