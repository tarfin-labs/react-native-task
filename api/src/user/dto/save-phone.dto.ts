import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class SavePhoneDto {
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsPhoneNumber('TR')
  phone: string;
}
