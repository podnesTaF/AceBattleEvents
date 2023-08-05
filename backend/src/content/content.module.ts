import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Module({
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
