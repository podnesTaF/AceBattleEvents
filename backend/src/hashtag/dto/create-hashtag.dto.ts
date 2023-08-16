import { IsString } from 'class-validator';

export class CreateHashtagDto {
  @IsString()
  name: string;
}
