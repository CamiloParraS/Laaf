import { IsBoolean, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { TemplateMetadata } from './entities/template-metadata.entity';

export class CreateMetadataTemplateDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(5)
  subject: string;

  @IsOptional()
  @IsBoolean()
  statusTemplate?: boolean;

  @IsUUID()
  creatorId: string;
}

export class UpdateMetadataTemplateDto {
  @IsString()
  @MinLength(4)
  name: string;
}

export interface MetadataTemplatePage {
  data: TemplateMetadata[];
  page: number;
  limit: number;
  total: number;
}
