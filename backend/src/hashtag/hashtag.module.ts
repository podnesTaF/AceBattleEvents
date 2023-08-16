import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
