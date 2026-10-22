import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  institutionId: string;

  @IsUUID()
  @IsOptional()
  areaLeaderId?: string;
}

export class UpdateAreaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  institutionId?: string;

  @IsUUID()
  @IsOptional()
  areaLeaderId?: string;
}
