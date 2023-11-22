import { Body, Controller, Post } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach-dto';

@Controller('coaches')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  create(@Body() dto: CreateCoachDto) {
    return this.coachService.create(dto);
  }
}