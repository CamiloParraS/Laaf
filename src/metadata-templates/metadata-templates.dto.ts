import { IsString, MinLength } from 'class-validator';

export class UpdateMetadataTemplateDto {
  @IsString()
  @MinLength(4)
  name: string;
}

export interface MetadataTemplateResponse {
  id: string;
  name: string;
  subject: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface MetadataTemplatePage {
  data: MetadataTemplateResponse[];
  page: number;
  limit: number;
  total: number;
}
