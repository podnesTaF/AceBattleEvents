import { IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @IsNumber()
  roleId: number;

  @IsNumber()
  userId: number;
}
