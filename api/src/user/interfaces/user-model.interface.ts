import { GenderType } from '../../store/enums/gender-type.enum';

export interface UserModel {
  firstName: string;
  lastName: string;
  gender: GenderType;
  tc: string;
  dateOfBirth: string;
  phone: string;
  token: {
    value: string;
    isVerified: boolean;
  };
  isPhoneVerified: boolean;
}
