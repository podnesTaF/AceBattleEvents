import { Body, Controller, Post, Req } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('/race-result')
  async createRaceResults(@Req() request: any, @Body() body: any) {
    console.log('Request:', request);
    console.log('Body:', body);
    // ... Your existing code here
    return await this.integrationService.createRaceResults(body);
  }

  @Post('/race-result/pacer-joker-switch')
  async createRaceResultsPacerJokerSwitch(@Body() body: any) {
    console.log(body);
    return await this.integrationService.createRaceResultsPacerJokerSwitch(
      body,
    );
  }
}
