import { IsObject, IsString } from 'class-validator';
import { Member } from 'src/member/entities/member.entity';

export class CreateVerifyMemberDto {
  @IsObject()
  member: Member;

  @IsString()
  token: string;
}
