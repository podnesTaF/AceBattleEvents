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
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/roles/roles.guard";
import { CreateRunnerDto } from "../dtos/create-runner.dto";
import { RunnerService } from "../services/runner.service";

@Controller("runners")
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Get()
  getAllRunners(@Query() queries: any) {
    return this.runnerService.findAll(queries);
  }

  @Get("/top")
  getTopRunners(
    @Query() queries: { count: number; gender?: "male" | "female" },
  ) {
    return this.runnerService.getTopRunners(queries);
  }

  @Get("/previews")
  getRunnerPreviews(
    @Query()
    queries: {
      type?: "search" | "all";
      query: string;
      limit?: string;
      page?: string;
      authId: string;
    },
  ) {
    return this.runnerService.getRunnerPreviews(queries);
  }

  @Get("/manager/:id")
  getRunnersByManager(@Param("id") id: string) {
    return this.runnerService.getRunnersByManager(+id);
  }

  @Get("/event/:id")
  getRunnersByEvent(
    @Param("id") id: string,
    @Query() queries: { teamId?: string; gender?: string },
  ) {
    return this.runnerService.getRunnersByEvent({ eventId: +id, queries });
  }

  @Get("/team/:id")
  getRunnersByTeam(@Param("id") id: string) {
    if (isNaN(+id)) {
      return null;
    }
    return this.runnerService.getRunnersByTeam(+id);
  }

  @Get("/followings")
  @UseGuards(JwtAuthGuard)
  getFollowings(@Request() req: any) {
    return this.runnerService.getFollowings(+req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("spectator")
  createRunner(
    @Request() req: { user: { id: number } },
    @Body() body: CreateRunnerDto,
  ) {
    return this.runnerService.create(body, req.user.id);
  }

  @Post("/follow/:id")
  @UseGuards(JwtAuthGuard)
  followRunner(@Request() req: any, @Param("id") id: string) {
    return this.runnerService.followRunner({
      runnerId: +id,
      userId: req.user.id,
    });
  }

  @Post("/unfollow/:id")
  @UseGuards(JwtAuthGuard)
  unfollowRunner(@Request() req: any, @Param("id") id: string) {
    return this.runnerService.unfollowRunner({
      runnerId: +id,
      userId: req.user.id,
    });
  }

  @Post("/points/calculate")
  updatePoints(@Query("gender") gender: string) {
    return this.runnerService.calculateUsersPoints(gender);
  }

  @Post("/ranking/calculate")
  updateRanking(@Query("gender") gender: string) {
    return this.runnerService.updateRanking(gender);
  }

  @Patch("/personal-bests")
  updatePersonalBests() {
    return this.runnerService.updatePersonalBestsForAllRunners();
  }
}
