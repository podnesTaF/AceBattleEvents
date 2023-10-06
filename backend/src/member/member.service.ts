import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Best } from 'src/bests/entities/best.entity';
import { CountryService } from 'src/country/country.service';
import { VerifyMemberService } from 'src/verify-member/verify-member.service';
import { Repository } from 'typeorm';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private repository: Repository<Member>,
    @InjectRepository(Best)
    private bestsRepository: Repository<Best>,
    private countryService: CountryService,
    private verifyRepository: VerifyMemberService,
  ) {}
  // async create(createMemberDto: CreateMemberDto) {
  //   const member = new Member();
  //   member.role = createMemberDto.role;
  //   member.firstName = createMemberDto.firstName;
  //   member.lastName = createMemberDto.lastName;
  //   member.email = createMemberDto.email;
  //   member.city = createMemberDto.city;

  //   let country = await this.countryService.returnIfExist({
  //     name: createMemberDto.country,
  //   });

  //   if (!country) {
  //     country = await this.countryService.create(createMemberDto.country);
  //   }
  //   member.country = country;
  //   member.gender = createMemberDto.gender;
  //   member.interest = createMemberDto.interest;

  //   try {
  //     if (member.role === MemberRole.RUNNER) {
  //       member.personalBests = [];
  //       member.seasonBests = [];

  //       const date = createDateFromDDMMYYYY(createMemberDto.dateOfBirth);
  //       member.dateOfBirth = date;
  //       for (let i = 0; i < createMemberDto.personalBests.length; i++) {
  //         const best = await this.bestsRepository.save({
  //           distanceInCm: createMemberDto.personalBests[i].distanceInCm,
  //           timeInMs: createMemberDto.personalBests[i].timeInMs,
  //         });
  //         member.personalBests.push(best);
  //       }

  //       for (let i = 0; i < createMemberDto.seasonBests.length; i++) {
  //         const best = await this.bestsRepository.save({
  //           distanceInCm: createMemberDto.seasonBests[i].distanceInCm,
  //           timeInMs: createMemberDto.seasonBests[i].timeInMs,
  //         });
  //         member.seasonBests.push(best);
  //       }

  //       member.category = createMemberDto.category;
  //     } else {
  //       member.ageRange = createMemberDto.ageRange;
  //     }

  //     const newMember = await this.repository.save(member);

  //     const randomToken = uuid.v4().toString();

  //     const verification = await this.verifyRepository.create({
  //       token: randomToken,
  //       member: newMember,
  //     });

  //     const msg = {
  //       to: newMember.email,
  //       from: 'it.podnes@gmail.com',
  //       subject: 'Verify email address | Ace Battle Mile',
  //       html: getVerificationLetterTemplate({
  //         token: verification.token,
  //         ticket: !!createMemberDto.attendBrussels,
  //       }),
  //     };

  //     try {
  //       await sgMail.send(msg);
  //     } catch (error) {
  //       console.log('error sending email', error.message);
  //     }

  //     return newMember;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async completeVerification({
    member,
    token,
    ticket,
  }: {
    member: Member;
    token: string;
    ticket: boolean;
  }) {
    try {
      const fullMember = await this.repository.findOne({
        where: { id: member.id },
      });

      fullMember.verified = true;

      await this.verifyRepository.delete(token);

      return this.repository.save(fullMember);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
