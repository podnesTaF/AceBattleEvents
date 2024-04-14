import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from 'src/modules/file/file.service';
import { AuthenticatedUser } from 'src/modules/users/decorators/user.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entities/team.entity';
import { TeamPlayerService } from './team-player.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly teamPlayerService: TeamPlayerService,
    private readonly fileService: FileService,
  ) {}

  async createTeam({
    user,
    dto,
    image,
    logo,
  }: {
    user: AuthenticatedUser;
    dto: CreateTeamDto;
    image?: Express.Multer.File;
    logo?: Express.Multer.File;
  }): Promise<Team> {
    // check if user is a coach
    if (user.roles.some((role) => role.name === 'coach') === false) {
      throw new UnauthorizedException('User is not a coach');
    }

    const team = await this.teamRepository.save({
      ...dto,
      coachId: user.id,
      runners: [],
    });

    // Upload Team Image
    if (image) {
      const url = await this.uploadTeamMedia(team.id, image, 'image');
      team.imageUrl = url;
    }

    // Upload Team Logo
    if (logo) {
      const url = await this.uploadTeamMedia(team.id, logo, 'logo');
      team.logoUrl = url;
    }

    // Save and Return the created team
    return this.teamRepository.save(team);
  }

  uploadTeamMedia(
    teamId: number,
    file: Express.Multer.File,
    type: 'image' | 'logo',
    oldMediaName?: string,
  ) {
    return this.fileService.uploadFileToStorage(
      file.originalname,
      `teams/${type}/${teamId}`,
      file.mimetype,
      file.buffer,
      { mediaName: file.originalname, contentType: file.mimetype },
      oldMediaName,
    );
  }

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['teamRunners', 'country', 'gender', 'category', 'coach'],
    });
  }

  // Get all teams previews
  findAllPreviews(): Promise<Partial<Team>[]> {
    return this.teamRepository.find({
      select: ['id', 'name', 'logoUrl'],
    });
  }

  // get team profile
  async getTeam(id: number): Promise<Team> {
    return this.teamRepository.findOne({
      where: { id },
      relations: [
        'teamRunners',
        'country',
        'gender',
        'teamRunners.runner.roles.role',
        'teamRunners.runner.country',
        'coach',
        'teamRaces',
        'teamRaces.race.eventRaceType.event',
      ],
      select: [
        'id',
        'name',
        'logoUrl',
        'imageUrl',
        'country',
        'gender',
        'teamRunners',
        'coach',
        'teamRaces',
      ],
    });
  }
}
