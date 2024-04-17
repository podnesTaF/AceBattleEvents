import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerJoinRequestDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
