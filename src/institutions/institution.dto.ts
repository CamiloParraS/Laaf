import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
