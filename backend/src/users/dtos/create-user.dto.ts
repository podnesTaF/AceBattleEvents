import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2)
  firstName: string;

  @Length(2)
  secondName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
