import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Best } from "src/bests/entities/best.entity";
import { RunnerController } from "../controllers/runner.controller";
import { Manager } from "../entities/manager.entity";
import { Runner } from "../entities/runner.entity";
import { User } from "../entities/user.entity";
import { RunnerService } from "../services/runner.service";

@Module({
  imports: [TypeOrmModule.forFeature([Runner, Best, User, Manager])],
  controllers: [RunnerController],
  providers: [RunnerService],
  exports: [RunnerService],
})
export class RunnerModule {}
