import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(2)
  firstName: string;

  @Length(2)
  lastName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password?: string;
}

export class RegisterWithGoogleDto {
  @IsString()
  id_token: string;
}

export class CreateUserWithGoogle extends CreateUserDto {
  @IsBoolean()
  emailVerified: boolean;
}
