import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RecoverDto, RegisterDto, ResetDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  // Same answer whether or not the email exists, so it can't be used to probe accounts.
  @Public()
  @Post('recover')
  @HttpCode(202)
  async recover(@Body() dto: RecoverDto) {
    await this.auth.recover(dto);
    return { message: 'If the email exists, a reset token was sent' };
  }

  @Public()
  @Post('reset')
  @HttpCode(200)
  async reset(@Body() dto: ResetDto) {
    await this.auth.reset(dto);
    return { message: 'Password updated' };
  }
}
