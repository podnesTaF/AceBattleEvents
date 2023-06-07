import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeEntity } from './entities/prize.entity';
import { PrizesController } from './prizes.controller';
import { PrizesService } from './prizes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrizeEntity])],
  controllers: [PrizesController],
  providers: [PrizesService],
  exports: [PrizesService],
})
export class PrizesModule {}
