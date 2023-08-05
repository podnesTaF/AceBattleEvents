import { IsNumber, IsString } from 'class-validator';

export class CreateClubRequestDto {
  @IsString()
  motivation: string;
  @IsNumber()
  clubId: number;
}
