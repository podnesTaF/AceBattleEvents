import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestResultsController } from './controllers/best-results.controller';
import { DistanceController } from './controllers/distance.controller';
import { BestResult } from './entities/best-result.entity';
import { Distance } from './entities/distance.entity';
import { BestResultsService } from './services/best-results.service';
import { DistanceService } from './services/distance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distance, BestResult])],
  controllers: [BestResultsController, DistanceController],
  providers: [BestResultsService, DistanceService],
})
export class BestResultsModule {}
