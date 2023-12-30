import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateVerifyMemberDto } from "./dto/create-verify-member.dto";
import { UpdateVerifyMemberDto } from "./dto/update-verify-member.dto";
import { VerifyMemberService } from "./verify-member.service";

@Controller("verify-member")
export class VerifyMemberController {
  constructor(private readonly verifyMemberService: VerifyMemberService) {}

  @Post()
  create(@Body() createVerifyMemberDto: CreateVerifyMemberDto) {
    return this.verifyMemberService.create(createVerifyMemberDto);
  }

  @Get("/check/:token")
  checkToken(@Param("token") token: string) {
    return this.verifyMemberService.checkToken(token);
  }

  @Get("/member/:token")
  getMemberByToken(@Param("token") token: string) {
    return this.verifyMemberService.getMember(token);
  }

  @Get("/user/:token")
  getUserByToken(@Param("token") token: string) {
    return this.verifyMemberService.getUser(token);
  }

  @Get()
  findAll() {
    return this.verifyMemberService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.verifyMemberService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVerifyMemberDto: UpdateVerifyMemberDto,
  ) {
    return this.verifyMemberService.update(+id, updateVerifyMemberDto);
  }
}
