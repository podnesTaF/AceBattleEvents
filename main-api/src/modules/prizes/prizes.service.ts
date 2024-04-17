import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePrizeCategoryDto } from "./dto/create-prize-category.dto";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { PrizeCategory } from "./entities/prize-category";
import { PrizeEntity } from "./entities/prize.entity";

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(PrizeEntity)
    private repository: Repository<PrizeEntity>,
    @InjectRepository(PrizeCategory)
    private categoryRepository: Repository<PrizeCategory>,
  ) {}

  create(createPrizeDto: CreatePrizeDto) {
    return this.repository.save(createPrizeDto);
  }

  async createPrizesCategory(dto: CreatePrizeCategoryDto) {
    const { prizes, ...categoryDto } = dto;

    const category = await this.categoryRepository.save(categoryDto);

    const createdPrizes = await this.repository.save(
      prizes.map((prize: CreatePrizeDto) => ({
        ...prize,
        categoryId: category.id,
      })),
    );

    category.prizes = createdPrizes;
    return await this.categoryRepository.save(category);
  }
}
