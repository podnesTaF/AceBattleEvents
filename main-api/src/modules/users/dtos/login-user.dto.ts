import { IsEmail, IsObject, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsStrongPassword(undefined, { message: 'Wrong password' })
  password?: string;
}

export class LoginWithGoogleDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsObject()
  user: {
    id: string;
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  };
}
