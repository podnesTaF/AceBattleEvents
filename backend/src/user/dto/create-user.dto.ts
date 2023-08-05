import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Club } from 'src/club/entities/club.entity';
import { Media } from 'src/media/entities/media.entity';

export class CreateUserDto {
  @Length(2)
  name: string;

  @Length(2)
  surname: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 32, { message: 'Password has be at last 6 characters' })
  password: string;

  @IsObject()
  @IsOptional()
  image?: Media;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  worldAthleticsUrl?: string;

  @IsNumber()
  @IsOptional()
  club?: Club;
}
