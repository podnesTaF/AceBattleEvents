import { IsObject, IsOptional, IsString } from 'class-validator';
import { Member } from 'src/member/entities/member.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateVerifyMemberDto {
  @IsObject()
  @IsOptional()
  member?: Member;

  @IsObject()
  @IsOptional()
  user?: User;

  @IsString()
  token: string;
}
