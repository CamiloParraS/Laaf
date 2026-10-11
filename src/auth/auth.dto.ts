import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Role } from '../generated/prisma/enums.js';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEnum(Role)
  role: Role;

  @IsUUID()
  institutionId: string;

  @IsUUID()
  areaId: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  last_login: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  institutionId: string;
  areaId: string;
}
