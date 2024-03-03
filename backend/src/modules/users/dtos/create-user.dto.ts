import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
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

export class CreateMigration extends CreateUserDto {
  @IsNumber()
  id: number;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  countryName: string;

  @IsString()
  @IsOptional()
  genderName: string;

  @IsString()
  @IsOptional()
  categoryName: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  verified: boolean;

  @IsDateString()
  createdAt: Date;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  roles: string[];
}
