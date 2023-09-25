import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestsService } from 'src/bests/bests.service';
import { Best } from 'src/bests/entities/best.entity';
import { PlayerEntity } from './entities/player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, Best])],
  controllers: [PlayersController],
  providers: [PlayersService, BestsService],
  exports: [PlayersService],
})
export class PlayersModule {}
