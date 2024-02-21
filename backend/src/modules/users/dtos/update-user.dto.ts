import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDtoWithImages extends UpdateUserDto {
  avatar?: Express.Multer.File;
  image?: Express.Multer.File;
  imageName?: string;
  avatarName?: string;
}
