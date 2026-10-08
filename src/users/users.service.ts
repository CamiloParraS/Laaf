import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { Repository } from 'typeorm';
import { Role, User } from './user.entity';

const scrypt = promisify(_scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${(await scrypt(password, salt, 64)).toString('hex')}`;
}

async function matchesPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':');
  return timingSafeEqual(await scrypt(password, salt, 64), Buffer.from(hash, 'hex'));
}

export interface NewUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  institutionId?: number;
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async create({ password, ...data }: NewUser): Promise<User> {
    if (await this.users.existsBy({ email: data.email })) {
      throw new ConflictException('Email already registered');
    }
    const saved = await this.users.save(
      this.users.create({ ...data, passwordHash: await hashPassword(password) }),
    );
    return this.users.findOneByOrFail({ id: saved.id });
  }

  findById(id: number): Promise<User | null> {
    return this.users.findOneBy({ id });
  }

  findByArea(areaId: number): Promise<User[]> {
    return this.users.find({ where: { areaId } });
  }

  async checkCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
    if (!user || !(await matchesPassword(password, user.passwordHash))) return null;
    return user;
  }

  // Returns the raw token only once; the DB keeps its hash.
  async createResetToken(email: string): Promise<string | null> {
    const user = await this.users.findOneBy({ email });
    if (!user) return null;
    const token = randomBytes(32).toString('hex');
    await this.users.update(user.id, {
      resetTokenHash: sha256(token),
      resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    });
    return token;
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect(['user.resetTokenHash', 'user.resetTokenExpiresAt'])
      .where('user.resetTokenHash = :hash', { hash: sha256(token) })
      .andWhere('user.resetTokenExpiresAt > :now', { now: new Date() })
      .getOne();
    if (!user) throw new BadRequestException('Invalid or expired token');
    await this.users.update(user.id, {
      passwordHash: await hashPassword(password),
      resetTokenHash: null,
      resetTokenExpiresAt: null,
    });
  }
}
