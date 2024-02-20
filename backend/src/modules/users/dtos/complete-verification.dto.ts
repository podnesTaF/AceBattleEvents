import { IsObject, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CompleteVerificationDto {
  @IsObject()
  user: User;

  @IsString()
  token: string;

  @IsString()
  password: string;
}
