import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtOptionalAuthGuard } from "src/auth/guards/jwt-optional-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CreateTeamRegistrationDto } from "./dto/create-team-registration.dto";
import { TeamRegistrationService } from "./team-registration.service";

@Controller("team-registrations")
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

  @Get("user")
  @UseGuards(JwtOptionalAuthGuard)
  findUserRegistrations(
    @Request() req: { user: { id: number } },
    @Query() queries?: { role: string },
  ) {
    if (queries.role === "spectator" || !queries.role || !req.user?.id) {
      return null;
    }

    return this.teamRegistrationService.findUserRegistrations(
      req.user.id,
      queries.role,
    );
  }

  @Get("/runner/:id")
  findRunnerRegistrations(
    @Param("id") id: string,
    @Query() queries?: { pastIncluded: boolean },
  ) {
    return this.teamRegistrationService.findRunnerRegistrations(
      +id,
      queries?.pastIncluded,
    );
  }
}
