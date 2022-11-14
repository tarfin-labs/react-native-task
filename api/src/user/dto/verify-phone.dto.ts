import { IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}
