import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @Post()
  // create(@Body() createMemberDto: CreateMemberDto) {
  //   return this.memberService.create(createMemberDto);
  // }

  @Post('/verify')
  verifyMember(
    @Body() dto: { member: Member; token: string; ticket: boolean },
  ) {
    return this.memberService.completeVerification(dto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
