import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  message: string;

  @IsString()
  aboutCommentator: string;
}