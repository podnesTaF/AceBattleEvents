import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestsController } from './bests.controller';
import { Best } from './entities/best.entity';
import { PersonalBestsService } from './personal-bests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Best])],
  controllers: [BestsController],
  providers: [PersonalBestsService],
  exports: [PersonalBestsService],
})
export class PersonalBestsModule {}
