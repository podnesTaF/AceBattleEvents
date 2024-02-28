import { IsObject, IsString } from 'class-validator';
import { AuthenticatedUser } from '../decorators/user.decorator';

export class CompleteVerificationDto {
  @IsObject()
  user: AuthenticatedUser;

  @IsString()
  token: string;
}
