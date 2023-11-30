import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCoachDto } from "../dtos/create-coach.dto";
import { CoachService } from "../services/coach.service";

@Controller("coaches")
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  async create(@Body() dto: CreateCoachDto) {
    return await this.coachService.create(dto);
  }

  @Get("/manager/:id")
  async getCoachesByManager(@Param("id") id: string) {
    return await this.coachService.getCoachesByManager({ userId: +id });
  }
}
