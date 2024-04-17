import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  dateOfBirth?: string | null;
  city?: string;
  countryId?: number;
  genderId?: number;
  notificationsEnabled?: boolean;
}

export class UpdateUserDtoWithImages extends UpdateUserDto {
  avatar?: Express.Multer.File;
  image?: Express.Multer.File;
  imageUrl?: string;
  avatarUrl?: string;
}
