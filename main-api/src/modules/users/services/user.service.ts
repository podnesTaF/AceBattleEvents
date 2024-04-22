import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import sgMail from "@sendgrid/mail";
import axios from "axios";
import * as bcrypt from "bcrypt";
import { format, parse } from "date-fns";
import { Content } from "src/modules/content/entities/content.entity";
import { CountryService } from "src/modules/country/country.service";
import { FileService } from "src/modules/file/file.service";
import { Gender } from "src/modules/gender/entities/gender.entity";
import { OneTimeTokenService } from "src/modules/ott/ott.service";
import { Role } from "src/modules/role/entities/role.entity";
import { RoleService } from "src/modules/role/role.service";
import { UserRoleService } from "src/modules/user-role/user-role.service";
import { Repository } from "typeorm";
import { AuthenticatedUser } from "../decorators/user.decorator";
import { CreateUserDto, CreateUserWithGoogle } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { UpdateUserDtoWithImages } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { getVerificationLetterTemplate } from "../utils/getVerificationTemplate";
import { AbstractUserService } from "./abstract-user.service";
import { RunnerService } from "./runner.service";

@Injectable()
export class UserService extends AbstractUserService {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    protected readonly roleService: RoleService,
    protected readonly userRoleService: UserRoleService,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    private countryService: CountryService,
    private fileService: FileService,
    private ottService: OneTimeTokenService,
    private runnerService: RunnerService,
  ) {
    super(repository, roleService, userRoleService);
  }

  async create(dto: CreateUserDto | CreateUserWithGoogle) {
    const isDuplicate = await this.isDuplicateEmail(dto.email);
    if (isDuplicate) {
      throw new ForbiddenException("Email already exists");
    }

    const user = new User();

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.city = dto.city;
    user.password = await bcrypt.hash(dto.password, 10);
    user.emailVerified = dto.emailConfirmed;

    const country = await this.countryService.findById(dto.countryId);

    if (country) {
      user.country = country;
    }
    const newUser = await this.repository.save(user);

    const userRoles = await this.createRolesForUser({
      userId: newUser.id,
      roleNames: ["user"],
      roleIds: dto.roleIds,
    });

    // create runner entity
    if (userRoles.some((r) => r.role.name === "runner")) {
      const user = await this.runnerService.becomeRunner(
        newUser.id,
        dto.runner,
      );
      if (!user) {
        await this.repository.delete(newUser.id);
        throw new Error("Error creating runner entity");
      }
    }

    user.roles = userRoles;

    return this.repository.save(user);
  }

  async isDuplicateEmail(email: string) {
    const isDuplicate = await this.repository.findOne({
      where: [{ email: email }],
    });
    if (isDuplicate) {
      return true;
    }

    return false;
  }

  async createRolesForUser({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: number;
    roleNames?: string[];
    roleIds?: number[];
  }) {
    let roles: Role[] = [];

    // Fetch roles based on provided IDs or names
    if (roleIds?.length) {
      roles = await Promise.all(
        roleIds.map((rId) => this.roleService.findByCond({ id: rId })),
      );
    } else if (roleNames?.length) {
      roles = await Promise.all(
        roleNames.map((rName) => this.roleService.findByCond({ name: rName })),
      );
    }

    if (!roles.length) {
      throw new Error("Roles not found");
    }

    // Process each role
    const userRoles = await Promise.all(
      roles.map(async (role) => {
        const userRole = await this.userRoleService.createUserRole({
          userId,
          roleId: role.id,
        });
        return userRole;
      }),
    );

    return userRoles;
  }

  async cancelRegistration(user: User) {
    await this.repository.delete(user.id);
  }

  async sendEmailConfirmation(user: AuthenticatedUser, jwt: string) {
    const fullUser = await this.repository.findOne({
      where: { id: user.id },
    });

    if (fullUser.emailVerified) {
      return;
    }

    const existingToken = await this.ottService.getOttByCond({
      userId: user.id,
      goal: "email-verify",
    });
    let token: string;

    if (existingToken && existingToken?.expiresAt > new Date()) {
      token = existingToken.ott;

      // If less then 5 minutes passed after the last email sent
      // If so, return void and do not send another email
      if (existingToken.createdAt > new Date(Date.now() - 300000)) {
        return;
      }
    } else {
      token = await this.ottService.createToken(user, jwt, 60, "email-verify");
    }

    const msg = {
      to: user.email,
      from: {
        email: "info@aba.run",
        name: "Ace Battle Mile",
      },
      subject: "Confirm your email address | Ace Battle Mile",
      html: getVerificationLetterTemplate({
        name: fullUser.firstName + " " + fullUser.lastName,
        token: token,
      }),
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("error sending email", error.message);
    }
  }

  async getVerifyStatus(userId: number): Promise<boolean> {
    const data = await this.userRepository.findOne({
      where: { id: userId },
      select: ["emailVerified"],
    });

    return data.emailVerified;
  }

  async completeVerification(ott: string) {
    const ottInstance = await this.ottService.getOttInfo(ott);

    if (!ottInstance) {
      throw new ForbiddenException("Invalid token");
    }

    const user = await this.repository.findOne({
      where: { id: ottInstance.userId },
    });

    user.emailVerified = true;

    await this.repository.save(user);

    return user;
  }

  async fetchImageAsMulterFile(url: string): Promise<Express.Multer.File> {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const contentType = response.headers["content-type"];
      const contentLength = response.headers["content-length"];

      const multerFile: Express.Multer.File = {
        buffer: response.data,
        size: parseInt(contentLength, 10),
        mimetype: contentType,
        originalname: url.split("/").pop() || "image", // Extract filename from URL or fallback to a default
        // You can fill in the rest of the Multer.File properties as needed, or set them to defaults
        fieldname: "image", // or 'avatar', depending on your needs
        encoding: "7bit", // Default encoding
        destination: "", // Not applicable for buffers
        filename: "", // Not applicable for buffers
        path: "", // Not applicable for buffers
        stream: null, // Not applicable for buffers
      };

      return multerFile;
    } catch (error) {
      console.error("Failed to fetch image:", error);
      throw new Error("Failed to fetch image");
    }
  }

  async sendGreetingNotification(user: User) {
    // const notification = this.notificationRepository.create({
    //   type: 'system',
    //   receivers: [user],
    //   title: `${user.name} ${user.surname}, Welcome to Ace Battle Mile!`,
    //   contents: [
    //     await this.contentRepository.findOne({
    //       where: { purpose: 'greeting' },
    //     }),
    //   ],
    // });
    // return this.notificationRepository.save(notification);
  }

  async getFollowingTeams(userId: number) {
    // const userWithTeams = await this.repository.findOne({
    //   where: { id: userId },
    //   relations: [
    //     'followingTeams',
    //     'followingTeams.logo',
    //     'followingTeams.teamImage',
    //     'followingTeams.country',
    //   ],
    // });
    // return userWithTeams.followingTeams;
  }

  findAll() {
    return this.repository.find({
      select: ["id", "firstName", "lastName", "email", "city", "country"],
    });
  }

  updateImage(id: number, imageId: number) {
    // return this.repository.update(id, { image: { id: imageId } });
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

  async findById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        "country",
        "runnerTeams",
        "runnerTeams.team",
        "runnerTeams.team.country",
        "runnerTeams.team.coach",
        "roles",
        "roles.role",
        "gender",
      ],
    });

    return user;
  }

  async findByCond(cond: LoginUserDto | { id: number }): Promise<User> {
    const query = this.repository
      .createQueryBuilder("user")
      .where({ ...cond })
      .leftJoinAndSelect("user.roles", "roles")
      .leftJoinAndSelect("roles.role", "role")
      .leftJoinAndSelect("user.gender", "gender")
      .leftJoinAndSelect("user.country", "country");

    const user = await query.getOne();

    if (user) {
      await this.ottService.removeExpiredUserTokens(user.id);
    }

    return user || null;
  }

  async count() {
    const count = await this.repository.count();
    return { "Total users": count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDtoWithImages) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (dto.image) {
      const imageUrl = await this.fileService.uploadFileToStorage(
        dto.image.originalname,
        `/images/${id}`,
        dto.image.mimetype,
        dto.image.buffer,
        { mediaName: dto.image.originalname, contentType: dto.image.mimetype },
        user.imageUrl,
      );

      if (imageUrl) {
        user.imageUrl = imageUrl;
      }
    }

    if (dto.avatar) {
      const avatarUrl = await this.fileService.uploadFileToStorage(
        dto.avatar.originalname,
        `/avatars/${id}`,
        dto.avatar.mimetype,
        dto.avatar.buffer,
        { mediaName: dto.avatar.originalname, contentType: dto.image.mimetype },
        user.avatarUrl,
      );

      if (avatarUrl) {
        user.avatarUrl = avatarUrl;
      }
    }

    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;

    if (dto.dateOfBirth !== undefined) {
      const parsedDate = parse(dto.dateOfBirth, "dd/MM/yyyy", new Date());

      const formattedDate = format(parsedDate, "yyyy-MM-dd");

      user.dateOfBirth = dto.dateOfBirth ? formattedDate : null;
    }

    if (dto.city !== undefined) {
      user.city = dto.city;
    }

    if (dto.countryId !== undefined) {
      user.countryId = dto.countryId || null;
    }

    if (dto.genderId !== undefined) {
      user.genderId = dto.genderId || null;
    }

    if (dto.avatarUrl !== undefined) {
      user.avatarUrl = dto.avatarUrl || null;
    }

    if (dto.imageUrl !== undefined) {
      user.imageUrl = dto.imageUrl || null;
    }

    if (dto.notificationsEnabled !== undefined) {
      user.notificationsEnabled = dto.notificationsEnabled;
    }

    return this.repository.save(user);

    // const user = await this.repository.findOne({ where: { id } });
    // let newCountry: Country;
    // if (dto.country) {
    //   const countryIfExist = await this.countryService.returnIfExist({
    //     name: dto.country,
    //   });
    //   if (countryIfExist) {
    //     newCountry = countryIfExist;
    //   } else {
    //     newCountry = await this.countryService.create(dto.country);
    //   }
    // }
    // user.city = dto.city || user.city;
    // user.country = newCountry || user.country;
    // user.name = dto.name || user.name;
    // user.image = dto.image || user.image;
    // user.surname = dto.surname || user.surname;
    // return this.repository.save(user);
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
