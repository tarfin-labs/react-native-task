import { Exclude } from 'class-transformer';
import { GenderType } from '../store/enums/gender-type.enum';
import { UserModel } from './interfaces/user-model.interface';

export class UserEntity implements UserModel {
  firstName: string;
  lastName: string;
  gender: GenderType;
  tc: string;
  dateOfBirth: string;
  phone: string;

  @Exclude()
  token: {
    value: string;
    isVerified: boolean;
  };

  isPhoneVerified: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
