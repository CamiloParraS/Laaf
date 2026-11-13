import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  getUsers(
    @Query('area_id', new ParseUUIDPipe({ optional: true })) areaId?: string,
    @Query('institution_id', new ParseUUIDPipe({ optional: true }))
    institutionId?: string,
  ): Promise<User[]> {
    return this.users.findAll({ areaId, institutionId });
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.users.findById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changes: UpdateUserDto,
  ): Promise<User> {
    return this.users.update(id, changes);
  }
}
