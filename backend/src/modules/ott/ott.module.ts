import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneTimeToken } from './entities/ott.entity';
import { OttController } from './ott.controller';
import { OneTimeTokenService } from './ott.service';

@Module({
  imports: [TypeOrmModule.forFeature([OneTimeToken])],
  controllers: [OttController],
  providers: [OneTimeTokenService],
})
export class OttModule {}
