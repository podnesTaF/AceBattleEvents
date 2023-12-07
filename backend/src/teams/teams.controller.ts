import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtOptionalAuthGuard } from "src/auth/guards/jwt-optional-auth.guard";
import { CreateTeamDto } from "./dto/create-team.dto";
import { TeamsService } from "./teams.service";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto, req.user.id);
  }

  @Post("/register")
  @UseGuards(JwtAuthGuard)
  registerTeam(
    @Request() req,
    @Body()
    dto: { teamId: number; eventId: number; txHash: string; wallet: string },
  ) {
    return this.teamsService.register(dto, req.user.id);
  }

  @Get()
  findAll(
    @Request() req,
    @Query()
    queries: {
      gender?: string;
      country?: string;
      name?: string;
      page?: number;
      limit?: number;
      user?: any;
    },
  ) {
    return this.teamsService.findAll(queries, +req?.user?.id);
  }

  @Get("/previews")
  findAllPreviews() {
    return this.teamsService.findAllPreviews();
  }

  @Get("/top")
  findTopTeams(
    @Query() queries: { count?: string; gender: "male" | "female" },
  ) {
    return this.teamsService.findTopTeams(queries);
  }

  @Get("/event/:id")
  findAllByEventId(
    @Param("id") eventId: string,
    @Query() query: { category?: string },
  ) {
    return this.teamsService.findAllByEventId(+eventId, {
      category: query.category,
    });
  }

  @Get("/snippet/:eventId")
  findAllSnippet(@Param("eventId") eventId: string) {
    return this.teamsService.findAllSnippetByEventId(+eventId);
  }

  @Get("/my")
  @UseGuards(JwtAuthGuard)
  findMyTeams(@Request() req: { user?: { id?: number } }) {
    if (!req.user) {
      throw new Error("User not found");
    }
    return this.teamsService.findAllByUser(+req.user.id);
  }

  @Get("/user/:id")
  findUsers(@Param("id") id: string) {
    return this.teamsService.findAllByUser(+id);
  }

  @Get("/manager/:id")
  findManagerTeams(
    @Param("id") id: string,
    @Query() query: { unregistered?: boolean; eventId?: string },
  ) {
    return this.teamsService.findAllManagerTeams(+id, query);
  }

  @Get("/registrations")
  @UseGuards(JwtAuthGuard)
  findAllReg(
    @Request() req,
    @Query() query: { limit?: string; page?: string },
  ) {
    return this.teamsService.getRegistrations(+req.user.id, query);
  }

  @Get("/:id/user-registrations")
  findAllRegByUser(
    @Param("id") id: string,
    @Query() query: { past?: boolean; year?: string },
  ) {
    return this.teamsService.getRegistrationsByPlayerId(+id, query);
  }

  @Get(":id")
  @UseGuards(JwtOptionalAuthGuard)
  findOne(@Param("id") id: string, @Request() req: any) {
    return this.teamsService.findOne(+id, req?.user?.id);
  }

  @Get("count")
  count() {
    return this.teamsService.count();
  }

  @Get("count/all")
  countAll() {
    return this.teamsService.countAll();
  }

  @Patch("/personal-bests")
  updatePersonalBests() {
    return this.teamsService.updatePersonalBestsForAllTeams();
  }

  @Patch("/total-points")
  calcuateTotals(@Query("gender") gender?: string) {
    return this.teamsService.calculateTeamsPoints(gender || "male");
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body()
    dto: {
      name: string;
      city: string;
      gender: string;
      coachId: number;
      players: number[];
    },
  ) {
    return this.teamsService.update(+id, dto);
  }

  @Post("/follow/:id")
  @UseGuards(JwtAuthGuard)
  followTeam(@Request() req: any, @Param("id") id: string) {
    return this.teamsService.followTeam({
      teamId: +id,
      userId: req.user.id,
    });
  }

  @Post("/unfollow/:id")
  @UseGuards(JwtAuthGuard)
  unfollowTeam(@Request() req: any, @Param("id") id: string) {
    return this.teamsService.unfollowTeam({
      teamId: +id,
      userId: req.user.id,
    });
  }
}
