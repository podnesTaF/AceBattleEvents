import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Best } from 'src/bests/entities/best.entity';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Event } from 'src/events/entities/event.entity';
import { FileService } from 'src/file/file.service';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { VerifyMember } from 'src/verify-member/entities/verify-member.entity';
import { VerifyMemberService } from 'src/verify-member/verify-member.service';
import { ViewerRegistration } from 'src/viewer-registrations/entities/viewer-registration.entity';
import { ViewerRegistrationsService } from 'src/viewer-registrations/viewer-registrations.service';
import { Member } from './entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member,
      Best,
      Country,
      VerifyMember,
      Media,
      ViewerRegistration,
      Event,
    ]),
  ],
  controllers: [MemberController],
  providers: [
    MemberService,
    CountryService,
    VerifyMemberService,
    FileService,
    ViewerRegistrationsService,
    MediaService,
  ],
})
export class MemberModule {}