import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Patch()
  update(@Body() dto: UpdatePlayerDto) {
    return this.playersService.update(dto);
  }

  @Get()
  findAll(
    @Query()
    queries: {
      gender?: string;
      name?: string;
      country?: string;
      page?: number;
      limit?: number;
    },
  ) {
    return this.playersService.findAll(queries);
  }

  @Get('count')
  count() {
    return this.playersService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }
}