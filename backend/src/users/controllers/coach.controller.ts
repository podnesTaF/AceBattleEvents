import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedUser, GetUser } from '../decorators/user.decorator';
import { BecomeCoachDto } from '../dtos/become-coach.dto';
import { CoachService } from '../services/coach.service';

@ApiTags('coaches')
@Controller('coaches')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  becomeCoach(@GetUser() user: AuthenticatedUser, @Body() dto: BecomeCoachDto) {
    return this.coachService.becomeCoach(user.id, dto);
  }
}
