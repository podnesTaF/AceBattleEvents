import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { PushToken } from "./entities/push-token.entity";
import { PushTokenController } from "./push-token.controller";
import { TokenService } from "./push-token.service";

@Module({
  imports: [TypeOrmModule.forFeature([PushToken, User])],
  controllers: [PushTokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class PushTokenModule {}
