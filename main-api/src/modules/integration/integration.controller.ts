import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participnat.dto";
import { IntegrationService } from "./integration.service";

@Controller("integration")
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post("/race-result")
  async createRaceResults(@Body() body: any) {
    return this.integrationService.createRaceResults(body);
  }

  @Post("/changes")
  async getChanges(@Body() body: any) {
    console.log("changes", body);
  }

  @Post("/live")
  async getLive(@Body() body: any) {
    console.log("live", body);
  }

  @Post("/race-result/pacer-joker-switch")
  async createRaceResultsPacerJokerSwitch(@Body() body: any) {
    return await this.integrationService.createRaceResultsPacerJokerSwitch(
      body,
    );
  }

  @Post("/participants")
  async createParticipnats(@Body() body: CreateParticipantDto) {
    return await this.integrationService.createParticipant(body);
  }

  @Get("/results")
  async getStatisResults() {
    return await this.integrationService.getStaticResults();
  }

  @Get("/race-results/paticipants")
  async getPaticipants() {
    return await this.integrationService.getParticipants();
  }
}
