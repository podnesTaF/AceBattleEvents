import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsStrongPassword(undefined, { message: 'Wrong password' })
  password?: string;
}
