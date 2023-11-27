import { Body, Controller, Post } from "@nestjs/common";
import { CreateCoachDto } from "../dtos/create-coach.dto";
import { CoachService } from "../services/coach.service";

@Controller("coaches")
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  async create(@Body() dto: CreateCoachDto) {
    return await this.coachService.create(dto);
  }
}
