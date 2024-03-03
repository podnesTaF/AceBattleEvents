import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { Content } from 'src/modules/content/entities/content.entity';
import { CountryService } from 'src/modules/country/country.service';
import { FileService } from 'src/modules/file/file.service';
import { Gender } from 'src/modules/gender/entities/gender.entity';
import { OneTimeTokenService } from 'src/modules/ott/ott.service';
import { RoleService } from 'src/modules/role/role.service';
import { UserRoleService } from 'src/modules/user-role/user-role.service';
import { Repository } from 'typeorm';
import { AuthenticatedUser } from '../decorators/user.decorator';
import {
  CreateMigration,
  CreateUserDto,
  CreateUserWithGoogle,
} from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UpdateUserDtoWithImages } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { getVerificationLetterTemplate } from '../utils/getVerificationTemplate';
import { AbstractUserService } from './abstract-user.service';

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
  ) {
    super(repository, roleService, userRoleService);
  }

  async create(dto: CreateUserDto | CreateUserWithGoogle) {
    await this.isDuplicateEmail(dto.email);

    const user = await this.repository.save(dto);
    const userRole = await this.createRoleForUser(user.id, 'user');
    user.roles = [userRole];

    return this.repository.save(user);

    // const user = new User();
    // user.role = dto.role;
    // user.name = dto.name;
    // user.surname = dto.surname;
    // user.email = dto.email;
    // user.image = dto.image;
    // user.avatar = dto.avatar;
    // user.phone = dto.countryCode + ' ' + dto.phone;
    // user.city = dto.city;
    // let country = await this.countryService.returnIfExist({
    //   name: dto.country,
    // });
    // if (!country) {
    //   country = await this.countryService.create(dto.country);
    // }
    // user.country = country;
    // user.interest = dto.interest;
    // const newUser = await this.repository.save(user);
    // const randomToken = uuid.v4().toString();
    // const verification = await this.verifyRepository.create({
    //   token: randomToken,
    //   user: newUser,
    // });

    // return this.repository.save(newUser);
  }

  async isDuplicateEmail(email: string) {
    const isDuplicate = await this.repository.findOne({
      where: [{ email: email }],
    });
    if (isDuplicate) {
      throw new ForbiddenException('User with this email already exists');
    }
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
      goal: 'email-verify',
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
      token = await this.ottService.createToken(user, jwt, 60, 'email-verify');
    }

    const msg = {
      to: user.email,
      from: {
        email: 'it.podnes@gmail.com',
        name: 'Ace Battle Mile',
      },
      subject: 'Confirm your email address | Ace Battle Mile',
      html: getVerificationLetterTemplate({
        name: fullUser.firstName + ' ' + fullUser.lastName,
        token: token,
      }),
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log('error sending email', error.message);
    }
  }

  async getVerifyStatus(userId: number): Promise<boolean> {
    const data = await this.userRepository.findOne({
      where: { id: userId },
      select: ['emailVerified'],
    });

    return data.emailVerified;
  }

  async completeVerification(ott: string) {
    const ottInstance = await this.ottService.getOttInfo(ott);

    if (!ottInstance) {
      throw new ForbiddenException('Invalid token');
    }

    const user = await this.repository.findOne({
      where: { id: ottInstance.userId },
    });

    user.emailVerified = true;

    await this.repository.save(user);

    return user;
  }

  async migrateUser(dto: CreateMigration) {
    const user = new User();
    user.id = dto.id;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.dateOfBirth = dto.dateOfBirth;
    user.city = dto.city;
    user.emailVerified = dto.verified;

    const country = await this.countryService.returnIfExist({
      name: dto.countryName,
    });

    user.country = country || null;

    const gender =
      (await this.genderRepository.findOne({
        where: { name: dto.genderName },
      })) || null;

    user.gender = gender;

    if (dto.imageUrl) {
      const image = await this.fetchImageAsMulterFile(dto.imageUrl);

      user.imageName = await this.fileService.uploadFileToStorage(
        image.originalname,
        `/images/${user.id}`,
        image.mimetype,
        image.buffer,
        [{ mediaName: image.originalname }],
        user.imageName,
      );
    }

    if (dto.avatarUrl) {
      const avatar = await this.fetchImageAsMulterFile(dto.avatarUrl);

      user.avatarName = await this.fileService.uploadFileToStorage(
        avatar.originalname,
        `/avatars/${user.id}`,
        avatar.mimetype,
        avatar.buffer,
        [{ mediaName: avatar.originalname }],
        user.avatarName,
      );
    }

    const savedUser = await this.userRepository.save(user);

    const roles = await Promise.all(
      dto.roles.map(async (role) => await this.roleService.findByName(role)),
    );

    const userRoles = await Promise.all(
      roles.map(
        async (role) =>
          await this.userRoleService.createUserRole({
            userId: savedUser.id,
            roleId: role.id,
          }),
      ),
    );

    user.roles = userRoles;

    await this.repository.save(user);
  }

  async fetchImageAsMulterFile(url: string): Promise<Express.Multer.File> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type'];
      const contentLength = response.headers['content-length'];

      const multerFile: Express.Multer.File = {
        buffer: response.data,
        size: parseInt(contentLength, 10),
        mimetype: contentType,
        originalname: url.split('/').pop() || 'image', // Extract filename from URL or fallback to a default
        // You can fill in the rest of the Multer.File properties as needed, or set them to defaults
        fieldname: 'image', // or 'avatar', depending on your needs
        encoding: '7bit', // Default encoding
        destination: '', // Not applicable for buffers
        filename: '', // Not applicable for buffers
        path: '', // Not applicable for buffers
        stream: null, // Not applicable for buffers
      };

      return multerFile;
    } catch (error) {
      console.error('Failed to fetch image:', error);
      throw new Error('Failed to fetch image');
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
      select: ['id', 'firstName', 'lastName', 'email', 'city', 'country'],
    });
  }

  updateImage(id: number, imageId: number) {
    // return this.repository.update(id, { image: { id: imageId } });
  }

  getRunnerFollowers(id: number) {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followingRunners', 'followingRunners')
      .where('followingRunners.id = :id', { id })
      .leftJoinAndSelect('user.image', 'image')
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.runner', 'runner')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('runner.teamsAsRunner', 'teamAsRunner')
      .getMany();
  }

  async findById(id: number, authId?: string) {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        'image',
        'country',
        'runner',
        'runner.personalBests',
        'runner.results',
        'runner.club',
        'runner.teamsAsRunner',
        'runner.teamsAsRunner.logo',
        'runner.teamsAsRunner.teamImage',
        'runner.teamsAsRunner.country',
        'runner.teamsAsRunner.coach',
        'runner.teamsAsRunner.personalBest',
        'runner.followers',
        'manager',
        'manager.club',
        'spectator',
        'spectator.favoriteClubs',
        'coach.teams.logo',
        'coach',
        'coach.teams.teamImage',
      ],
    });

    // let isFollowing;

    // if (authId) {
    //   isFollowing = user.runner?.followers?.some(
    //     (follower) => follower.id === +authId,
    //   );
    // } else {
    //   isFollowing = null;
    // }

    // return user.runner
    //   ? { ...user, runner: { ...user.runner, isFollowing } }
    //   : user;
  }

  async findByCond(cond: LoginUserDto | { id: number }): Promise<User> {
    const query = this.repository
      .createQueryBuilder('user')
      .where({ ...cond })
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.role', 'role')
      .leftJoinAndSelect('user.gender', 'gender')
      .leftJoinAndSelect('user.country', 'country');

    const user = await query.getOne();

    if (user) {
      await this.ottService.removeExpiredUserTokens(user.id);
    }

    return user || null;
  }

  async count() {
    const count = await this.repository.count();
    return { 'Total users': count };
  }

  update(id: number, dto: User) {
    return this.repository.update(id, { ...dto });
  }

  async updateProfileData(id: number, dto: UpdateUserDtoWithImages) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (dto.image) {
      await this.fileService.uploadFileToStorage(
        dto.image.originalname,
        `/images/${id}`,
        dto.image.mimetype,
        dto.image.buffer,
        [{ mediaName: dto.image.originalname }],
        user.imageName,
      );

      user.imageName = dto.image.originalname;
    }

    if (dto.avatar) {
      await this.fileService.uploadFileToStorage(
        dto.avatar.originalname,
        `/avatars/${id}`,
        dto.avatar.mimetype,
        dto.avatar.buffer,
        [{ mediaName: dto.avatar.originalname }],
        user.avatarName,
      );

      user.avatarName = dto.avatar.originalname;
    }

    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;

    if (dto.dateOfBirth !== undefined) {
      console.log(dto.dateOfBirth, 'dateOfBirth');
      user.dateOfBirth = dto.dateOfBirth ? new Date(dto.dateOfBirth) : null;
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

    if (dto.avatarName !== undefined) {
      user.avatarName = dto.avatarName || null;
    }

    if (dto.imageName !== undefined) {
      user.imageName = dto.imageName || null;
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
      throw new ForbiddenException('Error Changing password');
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
