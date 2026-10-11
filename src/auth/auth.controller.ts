import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import type { AuthResponse } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() payload: RegisterDto): AuthResponse {
    return this.auth.register(payload);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() payload: LoginDto): AuthResponse {
    return this.auth.login(payload);
  }
}
