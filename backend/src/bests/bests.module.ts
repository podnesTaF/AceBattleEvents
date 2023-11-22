import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestsController } from './bests.controller';
import { BestsService } from './bests.service';
import { Best } from './entities/best.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Best])],
  controllers: [BestsController],
  providers: [BestsService],
  exports: [BestsService],
})
export class BestsModule {}