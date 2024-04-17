import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrizeCategory } from "./entities/prize-category";
import { PrizeEntity } from "./entities/prize.entity";
import { PrizesController } from "./prizes.controller";
import { PrizesService } from "./prizes.service";

@Module({
  imports: [TypeOrmModule.forFeature([PrizeEntity, PrizeCategory])],
  controllers: [PrizesController],
  providers: [PrizesService],
  exports: [PrizesService],
})
export class PrizesModule {}
