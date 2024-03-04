import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { FileService } from '../file/file.service';
import { TeamPlayerController } from './controllers/team-player.controller';
import { TeamController } from './controllers/team.controller';
import { TeamPlayer } from './entities/team-player.entity';
import { Team } from './entities/team.entity';
import { TeamPlayerService } from './services/team-player.service';
import { TeamService } from './services/team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamPlayer, User])],
  controllers: [TeamController, TeamPlayerController],
  providers: [TeamService, TeamPlayerService, FileService],
  exports: [TeamPlayerService],
})
export class TeamModule {}
