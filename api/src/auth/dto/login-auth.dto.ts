import { IsString, MaxLength, MinLength } from 'class-validator';

export class LogintAuthDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  tc: string;
}
