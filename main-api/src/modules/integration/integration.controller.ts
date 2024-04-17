import { Body, Controller, Post, Req } from "@nestjs/common";
import { IntegrationService } from "./integration.service";

@Controller("integration")
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post("/race-result")
  async createRaceResults(@Req() request: any, @Body() body: any) {
    return await this.integrationService.createRaceResults(body);
  }

  @Post("/race-result/pacer-joker-switch")
  async createRaceResultsPacerJokerSwitch(@Body() body: any) {
    return await this.integrationService.createRaceResultsPacerJokerSwitch(
      body,
    );
  }
}
