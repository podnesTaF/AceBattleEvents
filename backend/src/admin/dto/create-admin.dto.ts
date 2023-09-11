import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 32, { message: 'Password has be at last 6 characters' })
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}
