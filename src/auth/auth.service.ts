import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AuthResponse, LoginDto, RegisterDto } from './auth.dto';

// Mirrors prisma `User` (dates as ISO strings).
interface User extends AuthResponse {
  password: string;
}

@Injectable()
export class AuthService {
  // POC: in-memory, lost on restart. Plain-text passwords. Replace with Prisma + hashing.
  private users: User[] = [];

  private strip({ password, ...user }: User): AuthResponse {
    return user;
  }

  register(dto: RegisterDto): AuthResponse {
    const email = dto.email.toLowerCase();
    if (this.users.some((u) => u.email === email)) {
      throw new ConflictException('Email already registered');
    }
    const now = new Date().toISOString();
    const user: User = {
      id: randomUUID(),
      name: dto.name,
      lastname: dto.lastname,
      email,
      password: dto.password,
      last_login: now,
      createdAt: now,
      updatedAt: now,
      role: dto.role,
      institutionId: dto.institutionId,
      areaId: dto.areaId,
    };
    this.users.push(user);
    return this.strip(user);
  }

  login(dto: LoginDto): AuthResponse {
    const user = this.users.find((u) => u.email === dto.email.toLowerCase());
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.last_login = user.updatedAt = new Date().toISOString();
    return this.strip(user);
  }
}
