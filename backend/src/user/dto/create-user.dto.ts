import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2)
  name: string;

  @Length(2)
  surname: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 32, { message: 'Password has be at last 6 characters' })
  password: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  club?: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}
