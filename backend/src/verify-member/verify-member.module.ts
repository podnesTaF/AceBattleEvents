import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyMember } from './entities/verify-member.entity';
import { VerifyMemberController } from './verify-member.controller';
import { VerifyMemberService } from './verify-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyMember])],
  controllers: [VerifyMemberController],
  providers: [VerifyMemberService],
  exports: [VerifyMemberService],
})
export class VerifyMemberModule {}