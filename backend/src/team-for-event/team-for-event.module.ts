import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamForEventEntity } from './entities/team-for-event.entity';
import { TeamForEventController } from './team-for-event.controller';
import { TeamForEventService } from './team-for-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamForEventEntity])],
  controllers: [TeamForEventController],
  providers: [TeamForEventService],
})
export class TeamForEventModule {}
