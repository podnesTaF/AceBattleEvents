import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunnerCoach } from './entity/runner-coach.entity';
import { RunnerCoachController } from './runner-coach.controller';
import { RunnerCoachService } from './runner-coach.service';

@Module({
  imports: [TypeOrmModule.forFeature([RunnerCoach])],
  controllers: [RunnerCoachController],
  providers: [RunnerCoachService],
})
export class RunnerCoachModule {}
