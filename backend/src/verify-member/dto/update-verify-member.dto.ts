import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifyMemberDto } from './create-verify-member.dto';

export class UpdateVerifyMemberDto extends PartialType(CreateVerifyMemberDto) {}
