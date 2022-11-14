import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserModel } from './interfaces/user-model.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getUsers(): Promise<UserModel[]> {
    return this.cacheManager.get<UserModel[]>('users');
  }

  async getByTc(tc: string) {
    const users = await this.getUsers();
    const user = users.find((user) => user.tc === tc);
    return user ? new UserEntity(user) : undefined;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserModel = {
      firstName: null,
      lastName: null,
      gender: null,
      dateOfBirth: null,
      phone: null,
      tc: createUserDto.tc,
      token: {
        value: crypto.randomBytes(40).toString('hex'),
        isVerified: false,
      },
      isPhoneVerified: false,
    };

    const users = await this.getUsers();
    users.push(user);
    await this.saveUsers(users);
    return new UserEntity(user);
  }

  async saveUsers(users: UserEntity[]) {
    return this.cacheManager.set('users', users, 0);
  }

  async getByToken(token: string) {
    const users = await this.getUsers();
    const user = users.find((user) => user.token.value === token);
    return user ? new UserEntity(user) : undefined;
  }

  async updateUser(user: UserModel) {
    const users = await this.getUsers();
    const updatedUsers = users.map((u) => (u.tc === user.tc ? user : u));
    await this.saveUsers(updatedUsers);
    return new UserEntity(user);
  }

  async savePhoneByTc(tc: string, phone: string) {
    const user = await this.getByTc(tc);

    return this.updateUser({
      ...user,
      phone,
    });
  }

  async verifyPhoneByTc(tc: string) {
    const user = await this.getByTc(tc);
    return this.updateUser({
      ...user,
      token: {
        value: user.token.value,
        isVerified: true,
      },
      isPhoneVerified: true,
    });
  }

  async refreshToken(user: UserEntity) {
    return this.updateUser({
      ...user,
      token: {
        value: crypto.randomBytes(40).toString('hex'),
        isVerified: false,
      },
    });
  }
}
