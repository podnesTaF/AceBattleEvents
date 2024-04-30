import { Module } from "@nestjs/common";
import { IntegrationController } from "./integration.controller";
import { IntegrationGateway } from "./integration.gateway";
import { IntegrationService } from "./integration.service";

@Module({
  controllers: [IntegrationController],
  providers: [IntegrationService, IntegrationGateway],
})
export class IntegrationModule {}
