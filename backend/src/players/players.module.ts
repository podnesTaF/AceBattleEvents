import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalBestEntity } from 'src/personal-bests/entities/personal-best.entity';
import { PersonalBestsService } from 'src/personal-bests/personal-bests.service';
import { PlayerEntity } from './entities/player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, PersonalBestEntity])],
  controllers: [PlayersController],
  providers: [PlayersService, PersonalBestsService],
  exports: [PlayersService],
})
export class PlayersModule {}
