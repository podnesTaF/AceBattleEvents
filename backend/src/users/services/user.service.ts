import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import sgMail from "@sendgrid/mail";
import * as bcrypt from "bcrypt";
import { CountryService } from "src/country/country.service";
import { Country } from "src/country/entity/country.entity";
import { getVerificationLetterTemplate } from "src/member/utils/getLetterTemplate";
import { VerifyMemberService } from "src/verify-member/verify-member.service";
import { Repository } from "typeorm";
import * as uuid from "uuid";
import { CompleteVerificationDto } from "../dtos/complete-verification.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { RunnerService } from "./runner.service";
import { SpectatorService } from "./spectator.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private countryService: CountryService,
    private runnerService: RunnerService,
    private spectatorService: SpectatorService,
    private verifyRepository: VerifyMemberService,
  ) {}

  async create(dto: CreateUserDto) {
    const isDuplicate = await this.repository.findOne({
      where: [{ email: dto.email }],
    });

    if (isDuplicate) {
      throw new ForbiddenException("User with this email already exists");
    }
    const user = new User();

    user.role = dto.role;
    user.name = dto.name;
    user.surname = dto.surname;
    user.email = dto.email;
    user.image = dto.image;
    user.avatar = dto.avatar;
    user.phone = dto.countryCode + " " + dto.phone;
    user.city = dto.city;
    let country = await this.countryService.returnIfExist({
      name: dto.country,
    });

    if (!country) {
      country = await this.countryService.create(dto.country);
    }
    user.country = country;
    user.interest = dto.interest;

    const newUser = await this.repository.save(user);

    if (dto.runner) {
      try {
        await this.runnerService.create(dto.runner, newUser);
      } catch (error) {
        throw new ForbiddenException(error.message);
      }
    }

    const randomToken = uuid.v4().toString();

    const verification = await this.verifyRepository.create({
      token: randomToken,
      user: newUser,
    });

    const msg = {
      to: newUser.email,
      from: {
        email: "it.podnes@gmail.com",
        name: "Ace Battle Mile",
      },
      subject: "Confirm your email address | Ace Battle Mile",
      html: getVerificationLetterTemplate({
        name: newUser.name,
        token: verification.token,
        ticket: false,
      }),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("error sending email", error.message);
    }

    return this.repository.save(newUser);
  }

  async completeVerification({
    user,
    token,
    password,
  }: CompleteVerificationDto) {
    try {
      const fullUser = await this.repository.findOne({
        where: { id: user.id },
      });

      fullUser.verified = true;

      const hashedPassword = await bcrypt.hash(password, 10);

      fullUser.password = hashedPassword;

      await this.verifyRepository.delete(token);

      return this.repository.save(fullUser);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  findAll() {
    return this.repository.find({
      select: ["id", "name", "surname", "email", "city", "country"],
    });
  }

  updateImage(id: number, imageId: number) {
    return this.repository.update(id, { image: { id: imageId } });
  }

  getRunnerFollowers(id: number) {
    return this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.followingRunners", "followingRunners")
      .where("followingRunners.id = :id", { id })
      .leftJoinAndSelect("user.image", "image")
      .leftJoinAndSelect("user.country", "country")
      .leftJoinAndSelect("user.runner", "runner")
      .leftJoinAndSelect("user.manager", "manager")
      .leftJoinAndSelect("runner.teamsAsRunner", "teamAsRunner")
      .getMany();
  }

  async findById(id: number, authId?: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        "image",
        "country",
        "runner",
        "runner.personalBests",
        "runner.results",
        "runner.club",
        "runner.teamsAsRunner",
        "runner.teamsAsRunner.logo",
        "runner.teamsAsRunner.teamImage",
        "runner.teamsAsRunner.country",
        "runner.teamsAsRunner.coach",
        "runner.teamsAsRunner.personalBest",
        "runner.followers",
        "manager",
        "manager.club",
        "spectator",
        "spectator.favoriteClubs",
      ],
    });

    let isFollowing;

    if (authId) {
      isFollowing = user.runner?.followers?.some(
        (follower) => follower.id === +authId,
      );
    } else {
      isFollowing = null;
    }

    return user.runner
      ? { ...user, runner: { ...user.runner, isFollowing } }
      : user;
  }

  async findByCond(cond: LoginUserDto) {
    const query = this.repository
      .createQueryBuilder("user")
      .where({ ...cond })
      .leftJoinAndSelect("user.image", "image");

    const userPreview = await query.getOne();

    if (userPreview.role === "runner") {
      query.leftJoinAndSelect("user.runner", "runner");
      query.leftJoinAndSelect("runner.club", "club");
    } else if (userPreview.role === "manager") {
      query.leftJoinAndSelect("user.manager", "manager");
      query.leftJoinAndSelect("manager.club", "club");
    }

    const user = await query.getOne();

    if (user) {
      const club = user[user.role]?.club || null;
      const clubId = club?.id;

      user[user.role] = null;
      return { ...user, clubId };
    }

    return null;
  }

  async count() {
    const count = await this.repository.count();
    return { "Total users": count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });

    let newCountry: Country;
    if (dto.country) {
      const countryIfExist = await this.countryService.returnIfExist({
        name: dto.country,
      });
      if (countryIfExist) {
        newCountry = countryIfExist;
      } else {
        newCountry = await this.countryService.create(dto.country);
      }
    }

    user.city = dto.city || user.city;
    user.country = newCountry || user.country;
    user.name = dto.name || user.name;
    user.image = dto.image || user.image;
    user.surname = dto.surname || user.surname;

    return this.repository.save(user);
  }

  async changePassword(
    id: number,
    dto: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) {
    if (dto.newPassword !== dto.confirmPassword || dto.newPassword.length < 6) {
      throw new ForbiddenException("Error Changing password");
    }
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      const isEqual = await bcrypt.compare(dto.oldPassword, user.password);
      if (isEqual) {
        const password = await bcrypt.hash(dto.newPassword, 10);
        return this.updatePassword(id, password);
      }
    }
    return null;
  }

  updatePassword(id: number, password: string) {
    return this.repository.update(id, { password });
  }
}
