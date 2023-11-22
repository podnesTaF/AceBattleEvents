import { Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
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
    },
  ) {
    return this.runnerService.getRunnerPreviews(queries);
  }

  @Get("/manager/:id")
  getRunnersByManager(@Param("id") id: string) {
    return this.runnerService.getRunnersByManager(+id);
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
