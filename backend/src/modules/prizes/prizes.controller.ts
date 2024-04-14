import { Body, Controller, Post } from "@nestjs/common";
import { CreatePrizeCategoryDto } from "./dto/create-prize-category.dto";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { PrizesService } from "./prizes.service";

@Controller("prizes")
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post()
  create(@Body() createPrizeDto: CreatePrizeDto) {
    return this.prizesService.create(createPrizeDto);
  }

  @Post("/category")
  createPrizesCategory(@Body() dto: CreatePrizeCategoryDto) {
    return this.prizesService.createPrizesCategory(dto);
  }
}
