import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from './entities/user.entity';

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
};

const comparePassword = (password: string, stored: string) => {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  return timingSafeEqual(
    scryptSync(password, salt, 64),
    Buffer.from(key, 'hex'),
  );
};

const publicData = (user: User) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  institutionId: user.institutionId,
  areaId: user.areaId,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    const existing = await this.users.findOneBy({ email });
    if (existing) throw new ConflictException('Email already registered');

    const user = this.users.create({
      name: dto.name,
      lastname: dto.lastname,
      email,
      password: hashPassword(dto.password),
      lastLogin: new Date(),
      role: dto.role,
      institutionId: dto.institutionId,
      areaId: dto.areaId,
    });

    try {
      const saved = await this.users.save(user);
      return { status: 201, data: publicData(saved) };
    } catch {
      throw new BadRequestException('Error registering user');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: dto.email.toLowerCase() })
      .getOne();

    if (!user || !comparePassword(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLogin = new Date();
    const saved = await this.users.save(user);
    return { status: 200, data: publicData(saved) };
  }
}
