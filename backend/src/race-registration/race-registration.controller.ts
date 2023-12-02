import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CheckInDto } from "./dto/check-in.dto";
import { CreateRaceRegistrationDto } from "./dto/create-race-registration.dto";
import { UpdateRaceRegistrationDto } from "./dto/update-race-registration.dto";
import { RaceRegistrationService } from "./race-registration.service";

@Controller("race-registrations")
export class RaceRegistrationController {
  constructor(
    private readonly raceRegistrationService: RaceRegistrationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  create(@Body() dto: CreateRaceRegistrationDto) {
    return this.raceRegistrationService.create(dto);
  }

  @Patch("check-in")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("manager", "coach")
  checkInTeam(
    @Body(new ValidationPipe()) dto: CheckInDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.raceRegistrationService.checkInTeamForRace(dto, +req.user.id);
  }

  @Patch("/approve/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  approveRegistration(@Param("id") id: string) {
    return this.raceRegistrationService.approveRegistration(+id);
  }

  @Get()
  findAll() {
    return this.raceRegistrationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.raceRegistrationService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRaceRegistrationDto: UpdateRaceRegistrationDto,
  ) {
    return this.raceRegistrationService.update(+id, updateRaceRegistrationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.raceRegistrationService.remove(+id);
  }
}
