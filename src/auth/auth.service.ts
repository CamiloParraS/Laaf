import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { DataSource } from 'typeorm';
import { AuthResponse, LoginDto, RegisterDto } from './auth.dto';

const COLUMNS = `"id", "name", "lastname", "email", "last_login", "createdAt", "updatedAt", "role", "institutionId", "areaId"`;

const derive = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString('hex');

const hash = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${derive(password, salt)}`;
};

const matches = (password: string, stored: string) => {
  const [salt, key] = stored.split(':');
  return timingSafeEqual(Buffer.from(derive(password, salt), 'hex'), Buffer.from(key, 'hex'));
};

@Injectable()
export class AuthService {
  constructor(private readonly db: DataSource) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    try {
      const [user] = await this.db.query<AuthResponse[]>(
        `INSERT INTO "User" ("name", "lastname", "email", "password", "role", "institutionId", "areaId")
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${COLUMNS}`,
        [dto.name, dto.lastname, dto.email.toLowerCase(), hash(dto.password), dto.role, dto.institutionId, dto.areaId],
      );
      return user;
    } catch (e) {
      const code = (e as { driverError?: { code?: string } }).driverError?.code;
      if (code === '23505') throw new ConflictException('Email already registered');
      if (code === '23503') throw new BadRequestException('Unknown institution or area');
      throw e;
    }
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const [row] = await this.db.query<(AuthResponse & { password: string })[]>(
      `SELECT ${COLUMNS}, "password" FROM "User" WHERE "email" = $1`,
      [dto.email.toLowerCase()],
    );
    if (!row || !matches(dto.password, row.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const [user] = await this.db.query<AuthResponse[]>(
      `UPDATE "User" SET "last_login" = now(), "updatedAt" = now() WHERE "id" = $1 RETURNING ${COLUMNS}`,
      [row.id],
    );
    return user;
  }
}
