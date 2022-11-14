import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LogintAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() loginAuthDto: LogintAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@User() user: UserEntity) {
    await this.authService.logout(user);
    return {};
  }
}
