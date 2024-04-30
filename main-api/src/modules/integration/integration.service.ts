import { Injectable } from "@nestjs/common";
import { IntegrationGateway } from "./integration.gateway";

@Injectable()
export class IntegrationService {
  constructor(private gateway: IntegrationGateway) {}

  createRaceResultsPacerJokerSwitch(body: any) {
    return body;
  }

  createRaceResults(body: any) {
    console.log(body);
    this.gateway.broadcastRaceResult(body);
  }
}
