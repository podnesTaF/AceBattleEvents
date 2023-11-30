import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CreateTeamRegistrationDto } from "./dto/create-team-registration.dto";
import { TeamRegistrationService } from "./team-registration.service";

@Controller("team-registration")
export class TeamRegistrationController {
  constructor(
    private readonly teamRegistrationService: TeamRegistrationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("manager", "admin")
  create(
    @Request() req: { user: { id: number } },
    @Body() createTeamRegistrationDto: CreateTeamRegistrationDto,
  ) {
    return this.teamRegistrationService.create(
      createTeamRegistrationDto,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.teamRegistrationService.findAll();
  }
}
