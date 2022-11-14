import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class VerifyPhoneGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      user,
    }: {
      user?: UserEntity;
    } = request;

    if (!user || !user.token.isVerified) {
      return false;
    }

    return true;
  }
}
