import { IsBoolean, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

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

export interface MetadataTemplateResponse {
  id: string;
  name: string;
  subject: string;
  statusTemplate: boolean;
  dateCreation: string;
  lastUpdate: string;
  creatorId: string;
}

export interface MetadataTemplatePage {
  data: MetadataTemplateResponse[];
  page: number;
  limit: number;
  total: number;
}
