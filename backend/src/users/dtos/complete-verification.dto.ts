import { IsObject, IsString, IsStrongPassword } from 'class-validator';
import { User } from '../entities/user.entity';

export class CompleteVerificationDto {
  @IsObject()
  user: User;
  @IsString()
  token: string;

  @IsStrongPassword()
  password: string;
}
