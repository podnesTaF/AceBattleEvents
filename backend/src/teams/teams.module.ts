import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachService } from 'src/coach/coach.service';
import { CoachEntity } from 'src/coach/entities/coach.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TeamEntity } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamEntity,
      PlayerEntity,
      CoachEntity,
      UserEntity,
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, PlayersService, CoachService, UserService],
  exports: [TeamsService],
})
export class TeamsModule {}
