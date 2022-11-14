import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LogintAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginAuthDto: LogintAuthDto) {
    const user = await this.userService.getByTc(loginAuthDto.tc);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      token: user.token.value,
    };
  }

  async verifyToken(token: string) {
    const user = await this.userService.getByToken(token);
    if (!user) {
      throw new Error('Invalid Token');
    }
    return user;
  }
  async logout(user: UserEntity) {
    this.userService.refreshToken(user);
  }
}
