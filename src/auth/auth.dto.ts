import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export enum Role {
  TEACHER = 'TEACHER',
  CORDINATOR = 'CORDINATOR',
  DIRECTOR = 'DIRECTOR',
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

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
  last_login: Date;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  institutionId: string;
  areaId: string;
}
