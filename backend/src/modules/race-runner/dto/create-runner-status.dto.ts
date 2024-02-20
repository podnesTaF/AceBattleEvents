import { IsOptional, IsString } from 'class-validator';

export class CreateRunnerStatusDto {
  @IsString()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly description: string;
}
