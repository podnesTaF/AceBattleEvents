import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Feedback } from './entities/feedback.entity';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}