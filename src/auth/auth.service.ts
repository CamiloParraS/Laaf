import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto, RecoverDto, RegisterDto, ResetDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  // New self-registered users are teachers with no area; a director/coordinator sets the area later.
  register(dto: RegisterDto) {
    return this.users.create({ ...dto, role: Role.TEACHER });
  }

  async login(dto: LoginDto) {
    const user = await this.users.checkCredentials(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return { access_token: await this.jwt.signAsync({ sub: user.id, role: user.role }) };
  }

  async recover(dto: RecoverDto) {
    const token = await this.users.createResetToken(dto.email);
    // ponytail: no mailer yet, the token goes to the server log. Send it by email and drop this line.
    if (token) this.logger.warn(`password reset token for ${dto.email}: ${token}`);
  }

  reset(dto: ResetDto) {
    return this.users.resetPassword(dto.token, dto.password);
  }
}
