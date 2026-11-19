import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.auth.register(payload);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() payload: LoginDto) {
    return this.auth.login(payload);
  }
}
