import { IsOptional, IsString, MinLength } from 'class-validator';

export class SaveDocumentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;
}
