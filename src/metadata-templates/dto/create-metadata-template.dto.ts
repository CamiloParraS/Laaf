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
