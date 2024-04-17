import { IsNumber, IsString } from 'class-validator';

export class CreateJoinRequestDto {
  @IsString()
  message: string;

  @IsNumber()
  teamId: number;

  @IsNumber()
  runnerId: number;
}
