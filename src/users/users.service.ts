import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUniqueViolation } from '../common/db-errors';
import { User } from '../auth/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserFilters {
  areaId?: string;
  institutionId?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(filters: UserFilters): Promise<User[]> {
    const { areaId, institutionId } = filters;
    if (!areaId && !institutionId) {
      throw new BadRequestException('Debe indicar area_id o institution_id');
    }
    return this.usersRepository.find({
      where: {
        ...(areaId && { areaId }),
        ...(institutionId && { institutionId }),
      },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<User> {
    const found = await this.usersRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return found;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    try {
      await this.usersRepository.update(user.id, {
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email?.toLowerCase(),
        areaId: dto.areaId,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException(`Email ${dto.email} ya está registrado`);
      }
      throw error;
    }
    return this.findById(id);
  }
}
