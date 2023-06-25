import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalBest } from './entities/personal-best.entity';
import { PersonalBestsController } from './personal-bests.controller';
import { PersonalBestsService } from './personal-bests.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalBest])],
  controllers: [PersonalBestsController],
  providers: [PersonalBestsService],
  exports: [PersonalBestsService],
})
export class PersonalBestsModule {}
