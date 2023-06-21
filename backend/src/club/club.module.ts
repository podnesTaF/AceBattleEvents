import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
