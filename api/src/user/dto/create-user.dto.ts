export class CreateUserDto {
  tc: string;
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
