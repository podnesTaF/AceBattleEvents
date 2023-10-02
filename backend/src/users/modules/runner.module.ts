import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunnerController } from '../controllers/runner.controller';
import { Runner } from '../entities/runner.entity';
import { RunnerService } from '../services/runner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Runner])],
  controllers: [RunnerController],
  providers: [RunnerService],
  exports: [RunnerService],
})
export class RunnerModule {}
