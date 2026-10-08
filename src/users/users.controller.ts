import { Controller, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Req } from '@nestjs/common';
import type { AuthRequest } from '../auth/auth.guard';
import { Roles } from '../auth/auth.guard';
import { Role } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('area/:areaId')
  @Roles(Role.DIRECTOR, Role.COORDINATOR)
  byArea(@Param('areaId', ParseIntPipe) areaId: number) {
    return this.users.findByArea(areaId);
  }

  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    const privileged = [Role.DIRECTOR, Role.COORDINATOR].includes(req.user.role);
    if (!privileged && req.user.sub !== id) throw new ForbiddenException();
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
