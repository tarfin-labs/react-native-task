import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SavePhoneDto } from './dto/save-phone.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from './user.entity';
import { User } from './user.decorator';
import { UserService } from './user.service';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyPhoneGuard } from '../auth/verify-phone.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save-phone')
  async savePhone(
    @Body() savePhoneDto: SavePhoneDto,
    @User() user: UserEntity,
  ) {
    if (user.isPhoneVerified) {
      throw new BadRequestException('Phone is already verified');
    }
    await this.userService.savePhoneByTc(user.tc, savePhoneDto.phone);
    return {};
  }

  @Post('verify')
  async verifyPhone(
    @Body() verifyPhone: VerifyPhoneDto,
    @User() user: UserEntity,
  ) {
    if (verifyPhone.code !== '123456') {
      throw new BadRequestException('Invalid code');
    }
    if (!user.phone) {
      throw new BadRequestException('Phone is not saved');
    }

    if (user.token.isVerified) {
      throw new BadRequestException('Phone is already verified');
    }

    return this.userService.verifyPhoneByTc(user.tc);
  }

  @UseGuards(VerifyPhoneGuard)
  @Get('/')
  async get(@User() user: UserEntity) {
    return user;
  }

  @UseGuards(VerifyPhoneGuard)
  @Put('/')
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: UserEntity) {
    return this.userService.updateUser({
      ...user,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
    });
  }
}
