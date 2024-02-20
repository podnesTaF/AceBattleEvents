import { IsString } from 'class-validator';

export class CreateRunnerRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
