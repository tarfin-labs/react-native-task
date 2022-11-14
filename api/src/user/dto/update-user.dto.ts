import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GenderType } from '../../store/enums/gender-type.enum';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(GenderType)
  gender: number;
}
