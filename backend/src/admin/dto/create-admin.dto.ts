import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}