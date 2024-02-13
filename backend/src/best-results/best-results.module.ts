import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BestResultsController } from './controllers/best-results.controller';
import { DistanceController } from './controllers/distance.controller';
import { BestResult } from './entities/best-result.entity';
import { Distance } from './entities/distance.entity';
import { BestResultsService } from './services/best-results.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distance, BestResult])],
  controllers: [BestResultsController, DistanceController],
  providers: [BestResultsService, DiscoveryService],
})
export class BestResultsModule {}
