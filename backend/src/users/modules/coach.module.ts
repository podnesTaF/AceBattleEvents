import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachController } from "../controllers/coach.controller";
import { Coach } from "../entities/coach.entity";
import { CoachService } from "../services/coach.service";

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
