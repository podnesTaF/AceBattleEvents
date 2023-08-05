import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService]
})
export class HashtagModule {}
