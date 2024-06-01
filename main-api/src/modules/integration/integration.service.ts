import { Injectable } from "@nestjs/common";
import axios from "axios";
import { CreateParticipantDto } from "./dto/create-participnat.dto";
import { IntegrationGateway } from "./integration.gateway";

@Injectable()
export class IntegrationService {
  constructor(private gateway: IntegrationGateway) {}

  createRaceResultsPacerJokerSwitch(body: any) {
    return body;
  }

  createRaceResults(body: any) {
    this.gateway.broadcastRaceResult(body);
  }

  async createParticipant(dto: CreateParticipantDto) {
    const { data } = await axios.post(
      "http://localhost/_287865/api/OJVQEZUWGHZCBTD4D74U692MEZPVDZGO",
      dto,
    );

    return data;
  }

  async getStaticResults() {
    const { data } = await axios.get(
      "http://localhost/_287865/api/XD6G8BR0BT8ZM7FM4CT32QZGTXOCCK8J",
    );
    return data;
  }

  async getParticipants() {
    const { data } = await axios.get(
      "http://localhost/_287865/api/R0WUF52DAVGQTR3287SBG8VM4UXJV2ZV",
    );

    return data;
  }
}
